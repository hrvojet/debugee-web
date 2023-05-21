import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IIssue } from '../models/issue.model';

@Injectable({
	providedIn: 'root',
})
export class IssueService {
	constructor(private http: HttpClient) {}

	getIssues(projectId: number) {
		return this.http.get<IIssue[]>(environment.protocol + environment.debugeeDomain + '/issues?projectId=' + projectId);
	}

	getIssueById(issueId: number) {
		return this.http.get<IIssue>(environment.protocol + environment.debugeeDomain + '/issues/' + issueId);
	}
}
