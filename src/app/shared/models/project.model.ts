import { IUser } from './user.model';

export interface IProject {
	id: number;
	title: string;
	description: string;
	openedIssues: number;
	closedIssues: number;
	owner: IUser;
}
