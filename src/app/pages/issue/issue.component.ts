import { Component, Input, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue/issue.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-issue',
	templateUrl: './issue.component.html',
	styleUrls: ['./issue.component.css'],
})
export class IssueComponent implements OnInit {
	ISSUES: any;
	@Input() issues: any;

	constructor(private issueService: IssueService, private route: ActivatedRoute) {
		// @ts-ignore
		// this.id = this.router.getCurrentNavigation()?.extras.state['id'] as number;
	}

	ngOnInit(): void {
		this.getIssues();
		console.log(this.issues);
	}

	getIssues(): void {
		const id = this.route.snapshot.paramMap.get('projectId');

		this.issueService.getIssues(Number(id)).subscribe((data) => {
			console.log('data: ' + data);
			this.ISSUES = data;
		});
	}
}
