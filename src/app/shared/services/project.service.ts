import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IProject, IProjectPost } from '../models/project.model';
import { IPage } from '../models/page/page.model';
import { FormControl, ɵFormGroupValue, ɵTypedOrUntyped } from '@angular/forms';

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	private readonly projectsUrl = environment.protocol + environment.debugeeDomain;

	constructor(private http: HttpClient) {}

	getProjects() {
		return this.http.get<IPage<IProject>>(this.projectsUrl);
	}

	getProjectByID(projectID: number) {
		return this.http.get(this.projectsUrl + `/projects/${projectID}`);
	}

	getProjectsPage(id: string, order: string, page: number, size: number) {
		const params = '?page=' + page + '&size=' + size + '&sortBy=' + order + '&id=' + id;
		return this.http.get<IPage<IProject>>(this.projectsUrl + '/projects' + params);
	}

	getProjectById(projectID: number) {
		return this.http.get<IProject>(this.projectsUrl + `/projects/${projectID}`);
	}

	postNewProject(body: IProjectPost) {
		return this.http.post<IProjectPost>(this.projectsUrl + '/projects', body);
	}

	patchExistingProject(projectID: number, title: string) {
		return this.http.patch(this.projectsUrl + `/projects/${projectID}`, { title });
	}
}
