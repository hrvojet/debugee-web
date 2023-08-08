import { IUser } from './user.model';

export interface IProject {
	id: number;
	title: string;
	description: string;
	created: Date;
	edited: Date;
	openedIssues: number;
	closedIssues: number;
	owner: IUser;
}

export interface IProjectPost {
	title: string;
	description: string;
}
