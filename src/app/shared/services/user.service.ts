import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { IUser } from '../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private jwtService: JwtService) {}

	public getCurrentUser(): IUser {
		return this.jwtService.decodeAccessToken();
	}
}
