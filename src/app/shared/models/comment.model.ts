import { IUser } from './user.model';

export interface IComment {
	id: number;
	text: string;
	created: Date;
	edited: Date;
	author: IUser;
}
