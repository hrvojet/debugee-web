import { Component } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'debugee-web';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof  NavigationEnd))
      .subscribe(e => {
        const params = this.router.parseUrl(this.router.url).queryParams;
        if(params[`access_token`]) {
          localStorage.setItem('access_token', params[`access_token`]);
          this.router.navigate((['/'])).then();
        }
      });
  }

  login() {
    console.log('changes are reflected?');
    window.location.href = `http://192.168.99.101/oauth/authorize?client_id=${environment.clientId}&redirect_uri=http://192.168.0.212:8080/callback/gitlab&response_type=code&scope=openid profile email read_api`;
  }
}
