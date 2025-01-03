import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { WelcomeScreenComponent } from './core/layout/welcome-screen/welcome-screen.component';
import { PageNotFoundComponent } from './core/layout/page-not-found/page-not-found.component';
import { MatIconModule } from '@angular/material/icon';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { PagesModule } from './pages/pages.module';
import { MarkdownModule } from 'ngx-markdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { NgOptimizedImage } from '@angular/common';

export function tokenGetter() {
	return localStorage.getItem('access_token');
}

@NgModule({
	declarations: [AppComponent, HeaderComponent, FooterComponent, WelcomeScreenComponent, PageNotFoundComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		JwtModule.forRoot({
			config: {
				tokenGetter,
				allowedDomains: [environment.debugeeDomain],
				disallowedRoutes: [environment.gitLabDomain],
			},
		}),
		PagesModule,
		MatToolbarModule,
		MatButtonToggleModule,
		MatButtonModule,
		MatIconModule,
		MarkdownModule.forRoot(),
		NgbModule,
		MatDialogModule,
		NgOptimizedImage,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
