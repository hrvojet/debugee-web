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

@NgModule({
	declarations: [ProjectComponent, IssueComponent, CommentComponent],
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
	],
})
export class PagesModule {}
