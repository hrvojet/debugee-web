import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IIssue } from '../../../shared/models/issue.model';
import { LabelService } from '../../../shared/services/label.service';
import { ILabel, ILabelUpdateIssue } from '../../../shared/models/label.model';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-manage-labels-dialog',
	templateUrl: './manage-labels-dialog.component.html',
	styleUrls: ['./manage-labels-dialog.component.css'],
})
export class ManageLabelsDialogComponent implements OnInit {
	labelsForm!: FormGroup;
	issue: IIssue;
	projectLabels!: ILabel[];

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { issue: IIssue },
		private labelService: LabelService,
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<ManageLabelsDialogComponent>
	) {
		this.issue = data.issue;
	}

	ngOnInit(): void {
		this.labelService.getAllLabelsForProject(this.issue.projectId).subscribe((res) => {
			this.projectLabels = res;

			this.labelsForm = this.fb.group({
				labels: new FormArray(
					this.projectLabels.map((l) =>
						this.issue.labels.find((rl) => rl.id === l.id) ? new FormControl(true) : new FormControl(false)
					)
				),
			});
		});
	}

	save(): void {
		const labelsUpdated = this.detectChanges(this.projectLabels, this.labelsForm.value.labels);
		this.labelService.updateLabelsForIssue(this.issue.id, labelsUpdated).subscribe(() => {
			for (const labelID of labelsUpdated.addLabelsWithID) {
				const pushLabel = this.projectLabels.find((label) => label.id === labelID);
				if (pushLabel) {
					this.issue.labels.push(pushLabel);
				}
			}
			for (const labelID of labelsUpdated.removeLabelsWithID) {
				const removeLabel = this.projectLabels.find((label) => label.id === labelID);
				if (removeLabel) {
					this.issue.labels = this.issue.labels.filter((label) => label.id !== labelID);
				}
			}
			this.dialogRef.close();
		});
	}

	detectChanges(labelsArray: ILabel[], controlValuesArray: boolean[]): ILabelUpdateIssue {
		const addLabelsWithID: number[] = [];
		const removeLabelsWithID: number[] = [];

		for (let i = 0; i < controlValuesArray.length; i++) {
			if (controlValuesArray[i] && !this.issue.labels.find((lbl) => lbl.id === labelsArray[i].id)) {
				addLabelsWithID.push(labelsArray[i].id);
			} else if (!controlValuesArray[i] && this.issue.labels.find((lbl) => lbl.id === labelsArray[i].id)) {
				removeLabelsWithID.push(labelsArray[i].id);
			}
		}
		/*const result =
			selectedValues.length === this.issue.labels.length &&
			this.issue.labels.every((e) => {
				return selectedValues.some((es) => {
					return e.id === es.id;
				});
			});
		if (result) {
			console.log('labels NOT changed!');
		} else {
			console.log('labels changed!');
		}*/
		return { addLabelsWithID, removeLabelsWithID };
	}
}
