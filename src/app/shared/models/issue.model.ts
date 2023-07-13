import { IUser } from './user.model';

export interface IIssue {
	id: number;
	projectId: number;
	title: string;
	created: Date;
	modified: Date;
	commentNumber: number;
	issueType: string;
	originalPoster: IUser;
	opened: boolean;
}
