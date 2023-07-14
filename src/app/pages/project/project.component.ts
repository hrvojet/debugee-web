import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../../shared/services/project.service';
import { IProject } from '../../shared/models/project.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, merge, startWith, switchMap } from 'rxjs';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit, AfterViewInit {
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
		this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				startWith({}),
				switchMap(() => {
					return this.projectService.getProjectsPage(
						this.sort.active,
						'DESC',
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
}
