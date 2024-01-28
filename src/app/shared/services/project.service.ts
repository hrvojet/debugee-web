import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IProject, IProjectPost } from '../models/project.model';
import { IPage } from '../models/page/page.model';

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	private readonly projectsUrl = environment.protocol + environment.debugeeDomain + '/api';

	constructor(private http: HttpClient) {}

	getProjects() {
		return this.http.get<IPage<IProject>>(this.projectsUrl);
	}

	getProjectByID(projectID: number) {
		return this.http.get(this.projectsUrl + `/projects/${projectID}`);
	}

	getProjectsPage(id: string, order: string, page: number, size: number, searchByTitle: string) {
		const params =
			'?page=' + page + '&size=' + size + '&sortBy=' + order + '&id=' + id + '&projectTitle=' + searchByTitle;
		return this.http.get<IPage<IProject>>(this.projectsUrl + '/projects' + params);
	}

	getFavouritesProjectsPage(id: string, order: string, page: number, size: number, searchByTitle: string) {
		const params =
			'?page=' + page + '&size=' + size + '&sortBy=' + order + '&id=' + id + '&projectTitle=' + searchByTitle;
		return this.http.get<IPage<IProject>>(this.projectsUrl + '/projects/favourites' + params);
	}

	getProjectById(projectID: number) {
		return this.http.get<IProject>(this.projectsUrl + `/projects/${projectID}`);
	}

	postNewProject(body: IProjectPost) {
		return this.http.post<IProjectPost>(this.projectsUrl + '/projects', body);
	}

	patchExistingProject(projectID: number, body: IProjectPost) {
		return this.http.patch(this.projectsUrl + `/projects/${projectID}`, body);
	}

	deleteProject(projectID: number) {
		return this.http.delete(this.projectsUrl + `/projects/${projectID}`);
	}

	addProjectToFavourites(projectId: number) {
		return this.http.post(this.projectsUrl + `/projects/favourite/${projectId}`, null);
	}

	removeProjectToFavourites(projectId: number) {
		return this.http.delete(this.projectsUrl + `/projects/favourite/${projectId}`);
	}
}
