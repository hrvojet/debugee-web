import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IIssue } from '../models/issue.model';
import { IPage } from '../models/page/page.model';

@Injectable({
	providedIn: 'root',
})
export class IssueService {
	constructor(private http: HttpClient) {}

	getIssues(projectId: number) {
		// TODO add pagination params
		return this.http.get<IPage<IIssue>>(
			environment.protocol + environment.debugeeDomain + '/issues?projectId=' + projectId
		);
	}

	getIssuesPage(projectId: number, sort: string, order: string, page: number, size: number) {
		const params = 'projectId=' + projectId + '&page=' + page + '&size=' + size + '&sortBy=' + order;
		// TODO add pagination params
		return this.http.get<IPage<IIssue>>(environment.protocol + environment.debugeeDomain + '/issues?' + params);
	}

	getIssueById(issueId: number) {
		return this.http.get<IIssue>(environment.protocol + environment.debugeeDomain + '/issues/' + issueId);
	}
}
