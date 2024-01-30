import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { filter, share, Subject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class SessionService {
	private onSubject = new Subject<{ key: string; value: any }>();
	public changes = this.onSubject.asObservable().pipe(share());

	constructor(private router: Router) {}

	login(): void {
		window.location.href = `http://${environment.gitLabDomain}${environment.gitLabTokenApi}?client_id=${environment.clientId}&redirect_uri=${environment.protocol}${environment.redirectUri}&response_type=code&scope=openid profile email read_api`;
	}

	isUserLoggedIn(): boolean {
		return !!localStorage.getItem('access_token');
	}

	logoutUser(): void {
		console.log('Logged out');
		localStorage.removeItem('access_token');
		void this.router.navigate(['/']).then(() => window.location.reload());
	}
}
