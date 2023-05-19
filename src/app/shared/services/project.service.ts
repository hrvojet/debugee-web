import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IProject } from '../models/project.model';

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	constructor(private http: HttpClient) {}

	getProjects() {
		return this.http.get<any>(environment.protocol + environment.debugeeDomain + '/projects');
	}

	getProjectById(id: number) {
		return this.http.get<IProject>(environment.protocol + environment.debugeeDomain + '/projects/' + id);
	}
}
