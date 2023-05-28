import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { IUser } from '../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private jwtService: JwtService) {}

	public getCurrentUser(): IUser {
		const token = this.jwtService.decodeAccessToken();
		return {
			id: Number(token.sub),
			avatar_url: token.avatar_url,
			email: token.email,
			username: token.username,
			web_url: '',
		};
	}
}
