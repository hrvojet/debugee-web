import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../../shared/services/project.service';
import { IProject } from '../../shared/models/project.model';
import { MatTableDataSource } from '@angular/material/table';
import { IIssue } from '../../shared/models/issue.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, merge, startWith, switchMap } from 'rxjs';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css'],
	encapsulation: ViewEncapsulation.None,
})
export class ProjectComponent implements OnInit, AfterViewInit {
	PROJECTS?: IProject[];

	resultsLength = 0;
	displayedColumns: string[] = ['title'];

	dataSource = new MatTableDataSource<IProject>();
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(private projectService: ProjectService) {}

	ngOnInit(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	ngAfterViewInit(): void {
		debugger;
		this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				startWith({}),
				switchMap(() => {
					return this.projectService.getProjects();
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
}
