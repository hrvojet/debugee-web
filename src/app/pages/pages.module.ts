import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { IssueComponent } from './issue/issue.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLinkWithHref } from '@angular/router';
import { CommentComponent } from './comment/comment.component';

@NgModule({
	declarations: [ProjectComponent, IssueComponent, CommentComponent],
	imports: [CommonModule, MatCardModule, MatIconModule, RouterLinkWithHref],
})
export class PagesModule {}
