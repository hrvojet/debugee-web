import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../../shared/services/project.service';
import { IProject } from '../../shared/models/project.model';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css'],
	encapsulation: ViewEncapsulation.None,
})
export class ProjectComponent implements OnInit {
	PROJECTS?: IProject[];

	constructor(private projectService: ProjectService) {}

	ngOnInit(): void {
		this.projectService.getProjects().subscribe((data) => {
			this.PROJECTS = data;
		});
	}
}
