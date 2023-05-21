import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SessionService } from '../../../services/auth/session.service';
import { filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnChanges, OnInit {
	isUserLogged: boolean | undefined;

	constructor(private sessionService: SessionService, private router: Router) {}

	ngOnInit(): void {
		//debugger;
		this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
			const params = this.router.parseUrl(this.router.url).queryParams;
			if (params[`access_token`]) {
				localStorage.setItem('access_token', params[`access_token`]);
				void this.router.navigate(['/projects']).then(() => {
					this.isUserLogged = this.sessionService.isUserLoggedIn(); // TODO observable that checks for local storage, no need to reload on init
				});
			}
		});
		this.isUserLogged = this.sessionService.isUserLoggedIn();
	}

	login() {
		//window.location.href = `http://192.168.99.101/oauth/authorize?client_id=${environment.clientId}&redirect_uri=http://192.168.0.212:8080/callback/gitlab&response_type=code&scope=openid profile email read_api`;
		this.sessionService.login();
	}

	ngOnChanges(changes: SimpleChanges): void {
		//this.isUserLogged = this.sessionService.isUserLoggedIn();
	}

	logout() {
		this.sessionService.logoutUser();
	}
}
