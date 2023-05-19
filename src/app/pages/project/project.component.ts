import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/services/project.service';
import { IProject } from '../../shared/models/project.model';
import { DataService } from '../../shared/services/data.service';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
	PROJECTS?: IProject[];
	project?: IProject;

	constructor(private projectService: ProjectService, private dataService: DataService) {}

	ngOnInit(): void {
		this.projectService.getProjects().subscribe((data) => {
			this.PROJECTS = data;
			console.log(data);
			console.log(this.PROJECTS);
		});

		this.dataService.currentProject.subscribe((project) => (this.project = project));
	}

	broadcastProject(project: IProject): void {
		this.dataService.updateProject(project);
	}
}
