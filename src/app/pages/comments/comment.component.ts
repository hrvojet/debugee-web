import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CommentService } from '../../shared/services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from '../../shared/services/issue.service';
import { forkJoin } from 'rxjs';
import { IComment } from '../../shared/models/comment.model';
import { IIssue } from '../../shared/models/issue.model';
import { UserService } from '../../shared/services/user.service';
import { IUser } from '../../shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ManageLabelsDialogComponent } from './manage-labels-dialog/manage-labels-dialog.component';
import { InputCommentTypeEnum } from './types/InputCommentType.enum';
import { InputCommentComponent } from './input-comment/input-comment.component';
import { DeleteIssueComponent } from '../issues/delete-issue/delete-issue.component';
import { LockIssueComponent } from '../issues/lock-issue/lock-issue.component';
import { ProjectService } from '../../shared/services/project.service';
import { IProject } from '../../shared/models/project.model';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit, AfterViewInit {
	title!: string;
	editingTitle: boolean = false;
	projectID!: number;

	issue?: IIssue;
	comments?: IComment[];
	editingCommentIndex: number | null = null;
	inputCommentType = InputCommentTypeEnum;

	project!: IProject;

	containsLabels!: boolean;

	@ViewChild(InputCommentComponent) inputCommentRef!: InputCommentComponent;

	currentUser!: IUser;
	participants?: Set<IUser>;
	usersHooverInfo: Map<number, IUser>;

	constructor(
		private commentService: CommentService,
		private route: ActivatedRoute,
		private issueService: IssueService,
		private projectService: ProjectService,
		private userService: UserService,
		private dialog: MatDialog
	) {
		this.usersHooverInfo = new Map<number, IUser>();
		this.projectID = Number(this.route.snapshot.paramMap.get('projectId'));
	}

	ngOnInit(): void {
		this.currentUser = this.userService.getCurrentUser();
	}

	ngAfterViewInit() {
		const issueID = Number(this.route.snapshot.paramMap.get('issueId'));
		forkJoin([
			this.issueService.getIssueById(issueID),
			this.commentService.getCommentsForSpecificIssue(issueID),
			this.projectService.getProjectById(this.projectID),
		]).subscribe(
			(res) => {
				this.issue = res[0];
				this.title = this.issue?.title;
				this.comments = res[1];
				this.project = res[2];
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

	saveComment(markdown: string) {
		this.commentService.postComment(Number(this.route.snapshot.paramMap.get('issueId')), markdown!).subscribe((res) => {
			this.comments?.push(res);
		});
	}

	editComment(commentIndex: number) {
		this.editingCommentIndex = commentIndex;
	}

	updateComment(updatedComment: IComment) {
		if (updatedComment) {
			this.commentService.updateComment(updatedComment.id, updatedComment.text).subscribe((res) => {
				this.comments![this.comments!.findIndex((comment) => comment.id === res.id)] = res;
			});
		}
		this.editingCommentIndex = null;
	}

	deleteOwnComment(comment: IComment): void {
		this.commentService.deleteComment(comment?.id).subscribe(() => {
			const indexToDelete: number = this.comments?.map((e) => e.id).indexOf(comment.id)!;
			this.comments?.splice(indexToDelete, 1);
		});
	}

	quoteComment(comment: IComment): void {
		/*const text = comment.text;

		const arr = text.split('\n');
		console.log(text);
		console.log(arr);*/

		this.inputCommentRef.markdown = '> ' + comment.text + '\n\n';
		this.inputCommentRef.markdownFocus.nativeElement.focus();
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

	openDeleteDialog() {
		this.dialog.open(DeleteIssueComponent, {
			data: {
				issue: this.issue,
			},
			panelClass: 'label-dialog-class',
			minWidth: '330px',
		});
	}

	openCloseIssueDialog() {
		const dialogRef = this.dialog.open(LockIssueComponent, {
			data: {
				issue: this.issue,
			},
			panelClass: 'label-dialog-class',
			minWidth: '330px',
		});

		dialogRef.afterClosed().subscribe((updatedIssue) => {
			if (updatedIssue) {
				this.issue = updatedIssue;
			}
		});
	}

	editTitle() {
		this.editingTitle = true;
	}

	updateTitle() {
		this.issueService.patchIssue(this.issue!.id, this.title, null).subscribe((updatedIssue) => {
			this.issue = updatedIssue;
			this.editingTitle = false;
		});
	}

	cancelTitleEdit() {
		this.editingTitle = false;
		this.title = this.issue!.title;
	}
}
