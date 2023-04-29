import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { IssueComponent } from './issue/issue.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	declarations: [ProjectComponent, IssueComponent],
	imports: [CommonModule, MatCardModule, MatIconModule],
})
export class PagesModule {}
