import { IUser } from './user.model';

export interface IIssue {
	id: number;
	projectId: number;
	title: string;
	commentNumber: number;
	issueType: string;
	originalPoster: IUser;
}
