import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IProject } from '../models/project.model';
import { IPage } from '../models/page/page.model';

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	constructor(private http: HttpClient) {}

	getProjects() {
		return this.http.get<IPage<IProject>>(environment.protocol + environment.debugeeDomain + '/projects');
	}

	getProjectsPage(id: string, order: string, page: number, size: number) {
		const params = '?page=' + page + '&size=' + size + '&sortBy=' + order + '&id=' + id;
		return this.http.get<IPage<IProject>>(environment.protocol + environment.debugeeDomain + '/projects' + params);
	}

	getProjectById(id: number) {
		return this.http.get<IProject>(environment.protocol + environment.debugeeDomain + '/projects/' + id);
	}
}
