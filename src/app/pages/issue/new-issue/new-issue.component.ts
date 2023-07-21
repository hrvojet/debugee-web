import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../shared/services/issue.service';
import { IUser } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';
import { merge } from 'rxjs/internal/operators/merge';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-new-issue',
	templateUrl: './new-issue.component.html',
	styleUrls: ['./new-issue.component.css'],
})
export class NewIssueComponent implements OnInit {
	currentUser!: IUser;
	markdown!: string;
	title!: string;

	constructor(
		private issueService: IssueService,
		private userService: UserService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.currentUser = this.userService.getCurrentUser();
	}

	submitNewIssue() {
		const projectID = Number(this.route.snapshot.paramMap.get('projectId'));
		this.issueService.postNewIssue(projectID, this.title, this.markdown).subscribe((res) => {
			console.log(res);
			void this.router.navigate(['/projects/' + projectID + '/' + res.id]);
		});
	}
}
