import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../shared/services/project.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProject, IProjectPost } from '../../../shared/models/project.model';

@Component({
	selector: 'app-new-project',
	templateUrl: './new-project.component.html',
	styleUrls: ['./new-project.component.css'],
})
export class NewProjectComponent implements OnInit {
	projectForm = new FormGroup({
		title: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required]),
	});

	constructor(private projectService: ProjectService, private router: Router) {}

	ngOnInit(): void {
		// void this.router.navigate([`projects/${id}`]);
	}

	saveNewProject() {
		this.projectService.postNewProject(this.projectForm.value as IProjectPost).subscribe((res) => {
			const newProject = res as IProject;
			void this.router.navigate([`/projects/${newProject.id}`]);
		});
	}
}
