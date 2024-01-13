import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IComment, ICommentPost } from '../models/comment.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CommentService {
	private readonly commentUrl = environment.protocol + environment.debugeeDomain + '/api';

	constructor(private http: HttpClient) {}

	getCommentsForSpecificIssue(issueID: number) {
		return this.http.get<IComment[]>(this.commentUrl + `/comments?issueId=${issueID}`);
	}

	postComment(issueId: number, text: string) {
		return this.http.post<IComment>(this.commentUrl + '/comments', { issueId, text });
	}

	deleteComment(commentID: number) {
		return this.http.delete<void>(this.commentUrl + `/comments/${commentID}`);
	}

	updateComment(commentID: number, text: string) {
		return this.http.patch<IComment>(this.commentUrl + `/comments/${commentID}`, { text });
	}
}
