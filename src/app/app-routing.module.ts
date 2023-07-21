import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeScreenComponent } from './core/layout/welcome-screen/welcome-screen.component';
import { PageNotFoundComponent } from './core/layout/page-not-found/page-not-found.component';
import { ProjectComponent } from './pages/project/project.component';
import { IssueComponent } from './pages/issue/issue.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { CommentComponent } from './pages/comment/comment.component';
import { NewIssueComponent } from './pages/issue/new-issue/new-issue.component';

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
		path: 'projects',
		component: ProjectComponent,
		canActivate: [AuthenticationGuard],
	},
	{
		path: 'projects/:projectId',
		component: IssueComponent,
		canActivate: [AuthenticationGuard],
	},
	{
		path: 'projects/:projectId/new',
		component: NewIssueComponent,
		canActivate: [AuthenticationGuard],
	},
	{
		path: 'projects/:projectId/:issueId',
		component: CommentComponent,
		canActivate: [AuthenticationGuard],
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
