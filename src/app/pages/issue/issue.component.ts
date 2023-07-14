import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IssueService } from '../../shared/services/issue.service';
import { ActivatedRoute } from '@angular/router';
import { IProject } from '../../shared/models/project.model';
import { ProjectService } from '../../shared/services/project.service';
import { forkJoin, map, merge, startWith, switchMap } from 'rxjs';
import { IIssue } from '../../shared/models/issue.model';
import { IPage } from '../../shared/models/page/page.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-issue',
	templateUrl: './issue.component.html',
	styleUrls: ['./issue.component.css'],
})
export class IssueComponent implements OnInit, AfterViewInit, OnDestroy {
	project?: IProject;

	resultsLength = 0;
	projectID!: number;

	displayedColumns: string[] = ['title', 'commentNumber'];

	dataSource = new MatTableDataSource<IIssue>();
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(
		private issueService: IssueService,
		private route: ActivatedRoute,
		private projectService: ProjectService
	) {}

	ngOnInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	ngAfterViewInit(): void {
		// TODO persist table order after page render in localStorage
		this.projectID = Number(this.route.snapshot.paramMap.get('projectId'));

		this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

		this.projectService.getProjectById(this.projectID).subscribe((res) => {
			this.project = res;
		});

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				startWith({}),
				switchMap(() => {
					return this.issueService.getIssuesPage(
						this.projectID,
						this.sort.active,
						'ASC',
						this.paginator.pageIndex,
						this.paginator.pageSize
					);
				}),
				map((data) => {
					if (data === null) {
						return [];
					}

					this.resultsLength = data.totalElements;
					return data.content;
				})
			)
			.subscribe((data) => {
				this.dataSource.data = data;
			});
	}

	ngOnDestroy(): void {}

	sortDataSource(id: string, start: string) {
		this.sort.active = id;
		this.issueService
			.getIssuesPage(this.projectID, this.sort.active, start, 0, this.paginator.pageSize)
			.subscribe((data) => {
				this.resultsLength = data.totalElements;
				this.dataSource.data = data.content;
			});
	}
}
