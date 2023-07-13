import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SessionService } from '../../../services/auth/session.service';
import { filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { IUser } from '../../../shared/models/user.model';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnChanges, OnInit, AfterViewInit {
	isUserLogged: boolean | undefined;
	currentUser: IUser | undefined;

	constructor(private sessionService: SessionService, private router: Router, private userService: UserService) {}

	ngOnInit(): void {
		//debugger;
		this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
			const params = this.router.parseUrl(this.router.url).queryParams;
			if (params[`access_token`]) {
				localStorage.setItem('access_token', params[`access_token`]);
				void this.router.navigate(['/projects']).then(() => {
					console.log("I'm in this shit");
					this.isUserLogged = this.sessionService.isUserLoggedIn(); // TODO observable that checks for local storage, no need to reload on init
					this.currentUser = this.userService.getCurrentUser();
				});
			}
		});
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

	ngAfterViewInit(): void {
		this.currentUser = this.userService.getCurrentUser();
		this.isUserLogged = this.sessionService.isUserLoggedIn();
	}
}
