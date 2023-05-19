import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IssueService } from '../../shared/services/issue.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { IProject } from '../../shared/models/project.model';
import { ProjectService } from '../../shared/services/project.service';
import { forkJoin } from 'rxjs';

@Component({
	selector: 'app-issue',
	templateUrl: './issue.component.html',
	styleUrls: ['./issue.component.css'],
})
export class IssueComponent implements OnInit, OnDestroy {
	ISSUES: any;
	@Input() issues: any;
	project?: IProject;

	constructor(
		private issueService: IssueService,
		private route: ActivatedRoute,
		private dataService: DataService,
		private projectService: ProjectService
	) {}

	ngOnInit(): void {
		const id = Number(this.route.snapshot.paramMap.get('projectId'));

		forkJoin([this.issueService.getIssues(id), this.projectService.getProjectById(id)]).subscribe((res) => {
			this.ISSUES = res[0];
			this.project = res[1];
		});
	}

	ngOnDestroy(): void {}

	getIssues(id: number): void {
		this.issueService.getIssues(Number(id)).subscribe((data) => {
			this.ISSUES = data;
		});
	}

	getProject(id: number) {
		this.projectService.getProjectById(Number(id)).subscribe((data) => {
			this.project = data;
		});
	}
}
