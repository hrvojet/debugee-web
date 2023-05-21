import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class CommentService {
	constructor(private http: HttpClient) {}

	getCommentsForSpecificIssue(issueID: number) {
		return this.http.get<any>(environment.protocol + environment.debugeeDomain + '/comments?issueId=' + issueID);
	}
}
