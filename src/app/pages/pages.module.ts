import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './projects/all/project.component';
import { IssueComponent } from './issues/issue.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLinkWithHref } from '@angular/router';
import { CommentComponent } from './comments/comment.component';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { DateAgoPipe } from '../shared/pipes/date-ago.pipe';
import { IssueHeaderComponent } from './issues/issue-header/issue-header.component';
import { NewIssueComponent } from './issues/new-issue/new-issue.component';
import { MatInputModule } from '@angular/material/input';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { NgbDropdownModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { LabelComponent } from './labels/label.component';
import { LabelDialogComponent } from './labels/label-dialog/label-dialog.component';
import { ManageLabelsDialogComponent } from './comments/manage-labels-dialog/manage-labels-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditProjectDialogComponent } from './projects/edit-project-dialog/edit-project-dialog.component';
import { InputCommentComponent } from './comments/input-comment/input-comment.component';
import { DeleteIssueComponent } from './issues/delete-issue/delete-issue.component';
import { FocusAfterRenderDirective } from '../shared/directives/focus-after-render.directive';
import { LockIssueComponent } from './issues/lock-issue/lock-issue.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProjectTabsComponent } from './projects/project-tabs.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
	declarations: [
		ProjectComponent,
		IssueComponent,
		CommentComponent,
		DateAgoPipe,
		IssueHeaderComponent,
		NewIssueComponent,
		NewProjectComponent,
		LabelComponent,
		LabelDialogComponent,
		ManageLabelsDialogComponent,
		EditProjectDialogComponent,
		InputCommentComponent,
		DeleteIssueComponent,
		LockIssueComponent,
		FocusAfterRenderDirective,
		ProjectTabsComponent,
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
		MatTooltipModule,
		MatPaginatorModule,
		MatTableModule,
		MatSortModule,
		MatInputModule,
		NgbDropdownModule,
		NgbPopoverModule,
		ReactiveFormsModule,
		MatCheckboxModule,
		MatToolbarModule,
		ClipboardModule,
	],
})
export class PagesModule {}
