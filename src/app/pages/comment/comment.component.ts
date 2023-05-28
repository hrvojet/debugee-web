import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommentService } from '../../shared/services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../../shared/services/issue.service';
import { catchError, forkJoin } from 'rxjs';
import { IComment } from '../../shared/models/comment.model';
import { IIssue } from '../../shared/models/issue.model';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.css'],
	encapsulation: ViewEncapsulation.None,
})
export class CommentComponent implements OnInit {
	issue?: IIssue;
	comments?: IComment[];
	markdown?: string;

	constructor(
		private commentService: CommentService,
		private route: ActivatedRoute,
		private router: Router,
		private issueService: IssueService
	) {}

	ngOnInit(): void {
		const id = Number(this.route.snapshot.paramMap.get('issueId'));
		console.log(id);

		forkJoin([this.issueService.getIssueById(id), this.commentService.getCommentsForSpecificIssue(id)]).subscribe(
			(res) => {
				console.log(res[0]);
				this.issue = res[0];
				this.comments = res[1];
				console.log(res[1]);
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

	handleErr() {
		console.log('error');
	}
}
