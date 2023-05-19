import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class IssueService {
	constructor(private http: HttpClient) {}

	getIssues(projectId: number) {
		return this.http.get<any>(environment.protocol + environment.debugeeDomain + '/issues?projectId=' + projectId);
	}
}
