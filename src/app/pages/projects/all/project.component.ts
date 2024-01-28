import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../../shared/services/project.service';
import { IProject } from '../../../shared/models/project.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { forkJoin, map, merge, Observable, startWith, switchMap } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import { IUser } from '../../../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit, AfterViewInit {
	@Input() favouritesTab!: boolean;

	searchPlaceholder!: string;

	resultsLength = 0;
	displayedColumns: string[] = ['title'];
	currentUser?: IUser;

	flag$!: Observable<boolean>;

	dataSource = new MatTableDataSource<IProject>();
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(private projectService: ProjectService, private userService: UserService, private router: Router) {}

	ngOnInit(): void {
		this.searchPlaceholder = this.favouritesTab ? 'Search favourite projects...' : 'Search projects...';
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.currentUser = this.userService.getCurrentUser();
	}

	ngAfterViewInit(): void {
		this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

		if (this.favouritesTab) {
			this.getFavouriteProjects('');
		} else {
			this.getAllProjects('');
		}
	}

	private getAllProjects(titleSearch: string): void {
		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				startWith({}),
				switchMap(() => {
					return forkJoin([
						this.projectService.getProjectsPage(
							this.sort.active,
							'DESC',
							this.paginator.pageIndex,
							this.paginator.pageSize,
							titleSearch
						),
						this.projectService.getFavouritesProjectsPage(
							this.sort.active,
							'DESC',
							this.paginator.pageIndex,
							this.paginator.pageSize,
							titleSearch
						),
					]);
				}),
				map((data) => {
					if (data === null) {
						return [];
					}

					let all = data[0].content;
					const fav = data[1].content;

					all.forEach((e) => (e.favourite = fav.some((f) => f.id === e.id)));
					this.resultsLength = data[0].totalElements;
					return data[0].content;
				})
			)
			.subscribe((data) => {
				this.dataSource.data = data;
			});
	}

	private getFavouriteProjects(titleSearch: string): void {
		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				startWith({}),
				switchMap(() => {
					return this.projectService.getFavouritesProjectsPage(
						this.sort.active,
						'DESC',
						this.paginator.pageIndex,
						this.paginator.pageSize,
						titleSearch
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

	addToFavourite(id: number, index: number) {
		this.projectService.addProjectToFavourites(id).subscribe((res) => {
			this.dataSource.data[index].favourite = true;
		});
	}

	removeFromFavourites(id: number, index: number) {
		this.projectService.removeProjectToFavourites(id).subscribe((res) => {
			this.dataSource.data[index].favourite = false;
		});
	}

	searchByProjectName(string: any) {
		console.log('searchByProjectName');
		const titleSearch = string.target.value ? string.target.value : '';

		if (this.favouritesTab) {
			this.getFavouriteProjects(titleSearch);
		} else {
			this.getAllProjects(titleSearch);
		}
	}

	goToNewProject() {
		console.log('new project');
		void this.router.navigate(['projects/new']);
	}
}
