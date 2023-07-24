import { IUser } from './user.model';
import { ILabel } from './label.model';

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
	labels: ILabel[];
}
