import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IssueService } from '../../shared/services/issue.service';
import { ActivatedRoute } from '@angular/router';
import { IProject } from '../../shared/models/project.model';
import { ProjectService } from '../../shared/services/project.service';
import { map, merge, startWith, switchMap } from 'rxjs';
import { IIssue } from '../../shared/models/issue.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../shared/services/user.service';
import { IUser } from '../../shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { EditProjectDialogComponent } from '../project/edit-project-dialog/edit-project-dialog.component';

@Component({
	selector: 'app-issue',
	templateUrl: './issue.component.html',
	styleUrls: ['./issue.component.css'],
})
export class IssueComponent implements OnInit, AfterViewInit, OnDestroy {
	project?: IProject;
	currentUser?: IUser;

	resultsLength = 0;
	projectID!: number;

	displayedColumns: string[] = ['title', 'commentNumber'];

	dataSource = new MatTableDataSource<IIssue>();
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(
		private issueService: IssueService,
		private route: ActivatedRoute,
		private projectService: ProjectService,
		private userService: UserService,
		private dialog: MatDialog
	) {}

	ngOnInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.currentUser = this.userService.getCurrentUser();
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

	onSearchKeyPressed($event: { title: string }) {
		this.issueService
			.searchIssue($event.title, this.projectID, this.sort.active, this.sort.direction, 0, this.paginator.pageSize)
			.subscribe((data) => {
				this.resultsLength = data.totalElements;
				this.dataSource.data = data.content;
			});
	}

	editParentProject() {
		this.dialog.open(EditProjectDialogComponent, {
			data: {
				project: this.project,
			},
			panelClass: 'label-dialog-class',
			minWidth: '330px',
		});
	}
}
