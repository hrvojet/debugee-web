import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'debugee-web';

	constructor(private router: Router) {
		this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
			const params = this.router.parseUrl(this.router.url).queryParams;
			if (params[`access_token`]) {
				localStorage.setItem('access_token', params[`access_token`]);
				this.router.navigate(['/']).then();
			}
		});
	}
}
