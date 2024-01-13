import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILabel, ILabelPost, ILabelUpdateIssue } from '../models/label.model';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class LabelService {
	private readonly labelApiUrl = environment.protocol + environment.debugeeDomain + '/api';

	constructor(private http: HttpClient) {}

	getAllLabelsForProject(projectID: number) {
		return this.http.get<ILabel[]>(this.labelApiUrl + '/labels/' + projectID);
	}

	saveLabelForProject(projectID: number, newLabel: ILabelPost) {
		return this.http.post<ILabel>(this.labelApiUrl + '/label/' + projectID, newLabel);
	}

	addLabelToIssue(labelID: number, issueID: number) {
		return this.http.post<ILabel>(this.labelApiUrl + '/label/' + labelID + '/issue/' + issueID, null);
	}

	editLabel(labelID: number, updatedLabel: ILabelPost) {
		return this.http.patch<ILabel>(this.labelApiUrl + '/label/' + labelID, updatedLabel);
	}

	removeLabelFromIssue(labelID: number, issueID: number) {
		return this.http.delete(this.labelApiUrl + '/label/' + labelID + '/issue/' + issueID);
	}

	updateLabelsForIssue(issueID: number, labelUpdateIssue: ILabelUpdateIssue) {
		return this.http.post(this.labelApiUrl + '/label/update-issue/' + issueID, labelUpdateIssue);
	}

	deleteLabel(labelID: number) {
		return this.http.delete(this.labelApiUrl + '/label/' + labelID);
	}
}
