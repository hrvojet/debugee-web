import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../services/auth/session.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
	constructor(private sessionService: SessionService, private router: Router) {}

	ngOnInit(): void {}

	goToHome() {
		if (this.sessionService.isUserLoggedIn()) {
			void this.router.navigate(['/projects']);
		} else {
			void this.router.navigate(['/welcome']);
		}
	}
}
