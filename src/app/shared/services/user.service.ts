import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { IUser } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private readonly projectsUrl = environment.protocol + environment.debugeeDomain + '/api';

	constructor(private jwtService: JwtService, private http: HttpClient) {}

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

	public getUserByID(id: number) {
		return this.http.get<IUser>(this.projectsUrl + '/user/' + id);
	}

	public getUsersByProject(id: number) {
		return this.http.get<IUser[]>(this.projectsUrl + '/user/project/' + id);
	}
}
