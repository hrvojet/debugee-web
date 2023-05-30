import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IComment, ICommentPost } from '../models/comment.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CommentService {
	constructor(private http: HttpClient) {}

	getCommentsForSpecificIssue(issueID: number) {
		return this.http.get<any>(environment.protocol + environment.debugeeDomain + '/comments?issueId=' + issueID);
	}

	postComment(issueId: number, text: string) {
		return this.http.post<IComment>(environment.protocol + environment.debugeeDomain + '/comments', { issueId, text });
	}

	deleteComment(commentId: number) {
		return this.http.delete<void>(environment.protocol + environment.debugeeDomain + '/comments/' + commentId);
	}
}
