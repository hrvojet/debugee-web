import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeScreenComponent } from './core/layout/welcome-screen/welcome-screen.component';
import { PageNotFoundComponent } from './core/layout/page-not-found/page-not-found.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'welcome',
		pathMatch: 'full',
	},
	{
		path: 'welcome',
		component: WelcomeScreenComponent,
	},
	{
		path: '**',
		component: PageNotFoundComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
