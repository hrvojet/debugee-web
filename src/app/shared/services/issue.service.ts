import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IIssue } from '../models/issue.model';
import { IPage } from '../models/page/page.model';

@Injectable({
	providedIn: 'root',
})
export class IssueService {
	private readonly issueUrl = environment.protocol + environment.debugeeDomain + '/api';

	constructor(private http: HttpClient) {}

	getIssuesPage(projectId: number, id: string, order: string, page: number, size: number) {
		const params = 'projectId=' + projectId + '&page=' + page + '&size=' + size + '&sortBy=' + order + '&id=' + id;
		// TODO add pagination params
		return this.http.get<IPage<IIssue>>(this.issueUrl + '/issues?' + params);
	}

	searchIssue(
		title: string,
		projectId: number,
		id: string,
		order: string,
		page: number,
		size: number,
		labelId?: number
	) {
		const params =
			'projectId=' +
			projectId +
			'&page=' +
			page +
			'&size=' +
			size +
			'&sortBy=' +
			order +
			'&id=' +
			id +
			'&labelID=' +
			(labelId ? labelId : '');
		return this.http.post<IPage<IIssue>>(this.issueUrl + '/issues/search?' + params, {
			title,
		});
	}

	getIssueById(issueId: number) {
		return this.http.get<IIssue>(this.issueUrl + `/issues/${issueId}`);
	}

	postNewIssue(projectId: number, title: string, firstComment: string) {
		return this.http.post<IIssue>(this.issueUrl + `/issues/${projectId}`, {
			title,
			firstComment,
		});
	}

	patchIssue(issueID: number, title: string | null, isOpened: boolean | null) {
		return this.http.patch<IIssue>(this.issueUrl + `/issues/${issueID}`, { title, isOpened });
	}

	deleteIssue(issueID: number) {
		return this.http.delete(this.issueUrl + `/issues/${issueID}`);
	}
}
