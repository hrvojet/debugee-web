import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../services/auth/session.service';

@Component({
	selector: 'app-welcome-screen',
	templateUrl: './welcome-screen.component.html',
	styleUrls: ['./welcome-screen.component.css'],
})
export class WelcomeScreenComponent implements OnInit {
	constructor(private sessionService: SessionService) {}

	ngOnInit(): void {}

	login() {
		this.sessionService.login();
	}
}
