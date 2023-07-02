import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IssueService } from '../../shared/services/issue.service';
import { ActivatedRoute } from '@angular/router';
import { IProject } from '../../shared/models/project.model';
import { ProjectService } from '../../shared/services/project.service';
import { forkJoin } from 'rxjs';
import { IIssue } from '../../shared/models/issue.model';
import { IPage } from '../../shared/models/page/page.model';

@Component({
	selector: 'app-issue',
	templateUrl: './issue.component.html',
	styleUrls: ['./issue.component.css'],
})
export class IssueComponent implements OnInit, OnDestroy {
	ISSUES?: IPage<IIssue>;
	project?: IProject;

	constructor(
		private issueService: IssueService,
		private route: ActivatedRoute,
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
}
