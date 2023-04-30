import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { IProject } from '../../shared/models/project.model';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
	PROJECTS?: IProject[];

	constructor(private projectService: ProjectService) {}

	ngOnInit(): void {
		this.projectService.getProjects().subscribe((data) => {
			this.PROJECTS = data;
			console.log(data);
			console.log(this.PROJECTS);
		});
	}
}
