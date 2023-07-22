import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { IssueComponent } from './issue/issue.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLinkWithHref } from '@angular/router';
import { CommentComponent } from './comment/comment.component';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { DateAgoPipe } from '../shared/pipes/date-ago.pipe';
import { IssueHeaderComponent } from './issue/issue-header/issue-header.component';
import { NewIssueComponent } from './issue/new-issue/new-issue.component';
import { MatInputModule } from '@angular/material/input';
import { NewProjectComponent } from './project/new-project/new-project.component';

@NgModule({
	declarations: [
		ProjectComponent,
		IssueComponent,
		CommentComponent,
		DateAgoPipe,
		IssueHeaderComponent,
		NewIssueComponent,
		NewProjectComponent,
	],
	imports: [
		CommonModule,
		MatCardModule,
		MatIconModule,
		RouterLinkWithHref,
		MarkdownModule,
		FormsModule,
		MatTabsModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatListModule,
		MatMenuModule,
		MatTooltipModule,
		MatPaginatorModule,
		MatTableModule,
		MatSortModule,
		MatInputModule,
	],
})
export class PagesModule {}
