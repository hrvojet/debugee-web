import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-issue-header',
	templateUrl: './issue-header.component.html',
	styleUrls: ['./issue-header.component.css'],
})
export class IssueHeaderComponent implements OnInit {
	@Output() stringToSearch = new EventEmitter<{ title: string }>();
	title!: string;

	constructor() {}

	ngOnInit(): void {}

	searchByName() {
		console.log('ngModle... ' + this.title);
		this.stringToSearch.emit({ title: this.title });
	}
}
