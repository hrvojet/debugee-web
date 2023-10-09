import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProject, IProjectPost } from '../../../shared/models/project.model';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ProjectService } from '../../../shared/services/project.service';

@Component({
	selector: 'app-edit-project-dialog',
	templateUrl: './edit-project-dialog.component.html',
	styleUrls: ['./edit-project-dialog.component.css'],
})
export class EditProjectDialogComponent implements OnInit, OnDestroy {
	projectForm: FormGroup;
	deleteProjectInput: FormControl;

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

		this.deleteProjectInput = new FormControl('', [this.validateDeleteButton()]);
	}

	ngOnInit(): void {
		this.projectForm.get('title')?.valueChanges.subscribe((newTitle) => {
			this.titleUpdated = newTitle !== this.project.title;
		});

		this.projectForm.get('description')?.valueChanges.subscribe((newDesc) => {
			this.descUpdated = newDesc !== this.project.description;
		});
	}

	ngOnDestroy() {}

	updateProject() {
		this.projectService.patchExistingProject(this.project.id, this.projectForm.value as IProjectPost).subscribe(() => {
			this.dialogRef.close();
			window.location.reload();
		});
	}

	checkIfBothUpdated() {
		this.updatable = this.titleUpdated || this.descUpdated;
	}

	deleteProject() {
		this.projectService.deleteProject(this.project.id).subscribe(() => {
			window.location.href = window.location.origin;
		});
	}

	private validateDeleteButton(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const input = control.value;

			return input === this.project.title ? null : { error: true };
		};
	}
}
