import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-issue-header',
	templateUrl: './issue-header.component.html',
	styleUrls: ['./issue-header.component.css'],
})
export class IssueHeaderComponent implements OnInit {
	@Output() stringToSearch = new EventEmitter<{ title: string }>();
	title!: string;

	constructor(private router: Router, private route: ActivatedRoute) {}

	ngOnInit(): void {}

	searchByName() {
		console.log('ngModle... ' + this.title);
		this.stringToSearch.emit({ title: this.title });
	}

	goToNewIssue() {
		void this.router.navigate([`projects/${Number(this.route.snapshot.paramMap.get('projectId'))}/new`]);
	}
}
