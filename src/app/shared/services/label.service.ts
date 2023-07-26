import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILabel, ILabelPost } from '../models/label.model';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class LabelService {
	constructor(private http: HttpClient) {}

	getAllLabelsForProject(projectID: number) {
		return this.http.get<ILabel[]>(environment.protocol + environment.debugeeDomain + '/labels/' + projectID);
	}

	saveLabelForProject(projectID: number, newLabel: ILabelPost) {
		return this.http.post<ILabel>(environment.protocol + environment.debugeeDomain + '/label/' + projectID, newLabel);
	}

	addLabelToIssue(labelID: number, issueID: number) {
		return this.http.post<ILabel>(
			environment.protocol + environment.debugeeDomain + '/label/' + labelID + '/issue/' + issueID,
			null
		);
	}

	editLabel(labelID: number, updatedLabel: ILabelPost) {
		return this.http.patch<ILabel>(
			environment.protocol + environment.debugeeDomain + '/label/' + labelID,
			updatedLabel
		);
	}

	removeLabelFromIssue(labelID: number, issueID: number) {
		return this.http.delete(
			environment.protocol + environment.debugeeDomain + '/label/' + labelID + '/issue/' + issueID
		);
	}

	deleteLabel(labelID: number) {
		return this.http.delete(environment.protocol + environment.debugeeDomain + '/label/' + labelID);
	}
}
