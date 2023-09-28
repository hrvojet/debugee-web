import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommentService } from '../../shared/services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../../shared/services/issue.service';
import { catchError, forkJoin } from 'rxjs';
import { IComment } from '../../shared/models/comment.model';
import { IIssue } from '../../shared/models/issue.model';
import { UserService } from '../../shared/services/user.service';
import { IUser } from '../../shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ManageLabelsDialogComponent } from './manage-labels-dialog/manage-labels-dialog.component';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit, AfterViewInit {
	issue?: IIssue;
	comments?: IComment[];
	markdown?: string;
	currentUser?: IUser;
	participants?: Set<IUser>;
	containsLabels!: boolean;
	usersHooverInfo: Map<number, IUser>;

	constructor(
		private commentService: CommentService,
		private route: ActivatedRoute,
		private router: Router,
		private issueService: IssueService,
		private userService: UserService,
		private dialog: MatDialog
	) {
		this.usersHooverInfo = new Map<number, IUser>();
	}

	ngOnInit(): void {
		this.currentUser = this.userService.getCurrentUser();
	}

	ngAfterViewInit() {
		const id = Number(this.route.snapshot.paramMap.get('issueId'));
		forkJoin([this.issueService.getIssueById(id), this.commentService.getCommentsForSpecificIssue(id)]).subscribe(
			(res) => {
				this.issue = res[0];
				this.comments = res[1];
				this.participants = this.mapDistinctUsers(this.comments!);
				if (this.issue) {
					this.containsLabels = res[0].labels.length === 0;
				}
			},
			() => {
				this.containsLabels = false;
			}
		);
	}

	saveComment() {
		this.commentService
			.postComment(Number(this.route.snapshot.paramMap.get('issueId')), this.markdown!)
			.subscribe((res) => {
				console.log(this.markdown + ' has been saved');
				this.comments?.push(res);
				this.markdown = '';
			});
	}

	deleteOwnComment(comment: IComment): void {
		this.commentService.deleteComment(comment?.id).subscribe(() => {
			const indexToDelete: number = this.comments?.map((e) => e.id).indexOf(comment.id)!;
			this.comments?.splice(indexToDelete, 1);
		});
	}

	quoteComment(comment: IComment): void {
		this.markdown = '> ' + comment.text;
	}

	private mapDistinctUsers(comments: IComment[]): Set<IUser> {
		const usersMap = new Map<number, IUser>();
		for (const comment of comments) {
			const userID = comment.author.id;
			if (!usersMap.has(userID)) {
				usersMap.set(userID, comment.author);
			}
		}
		return new Set(usersMap.values());
	}

	getUserInfo(user: IUser) {
		if (!this.usersHooverInfo?.has(user.id)) {
			this.userService.getUserByID(user.id).subscribe((fetchedUser) => {
				this.usersHooverInfo!.set(fetchedUser.id, fetchedUser);
			});
		}
	}

	openLabelDialog(): void {
		this.dialog.open(ManageLabelsDialogComponent, {
			data: {
				issue: this.issue,
			},
			panelClass: 'label-dialog-class',
			minWidth: '330px',
		});
	}
}
