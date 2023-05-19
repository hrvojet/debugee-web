import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProject } from '../models/project.model';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	private projectSource = new BehaviorSubject<any>({});
	currentProject = this.projectSource.asObservable();

	constructor() {}

	updateProject(project: IProject) {
		this.projectSource.next(project);
	}
}
