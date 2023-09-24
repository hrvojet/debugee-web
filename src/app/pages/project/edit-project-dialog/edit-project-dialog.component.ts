import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProject } from '../../../shared/models/project.model';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ProjectService } from '../../../shared/services/project.service';

@Component({
	selector: 'app-edit-project-dialog',
	templateUrl: './edit-project-dialog.component.html',
	styleUrls: ['./edit-project-dialog.component.css'],
})
export class EditProjectDialogComponent implements OnInit, OnDestroy {
	projectForm: FormGroup;
	project: IProject;
	updatable = false;

	private titleUpdated = false;
	private descUpdated = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { project: IProject },
		private projectService: ProjectService,
		private dialogRef: MatDialogRef<EditProjectDialogComponent>
	) {
		this.project = data.project;
		this.projectForm = new FormGroup({
			title: new FormControl(data.project.title, [Validators.required]),
			description: new FormControl(data.project.description, [Validators.required]),
		});
	}

	ngOnInit(): void {
		this.projectForm.get('title')?.valueChanges.subscribe((newTitle) => {
			this.titleUpdated = newTitle !== this.project.title;
		});

		this.projectForm.get('description')?.valueChanges.subscribe((newDesc) => {
			this.descUpdated = newDesc !== this.project.description;
		});
		console.log('initial updateable', this.updatable);
	}

	ngOnDestroy() {}

	updateProject() {
		//this.dialogRef.close();
		console.log(this.updatable);
	}

	checkIfBothUpdated() {
		this.updatable = this.titleUpdated || this.descUpdated;
	}
}
