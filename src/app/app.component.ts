import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './services/auth/session.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	title = 'debugee-web';

	constructor(private sessionService: SessionService, private router: Router) {}

	ngOnInit(): void {
		if (this.sessionService.isUserLoggedIn()) {
			void this.router.navigate(['/projects']);
		}
	}
}
