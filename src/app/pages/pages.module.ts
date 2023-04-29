import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { IssueComponent } from './issue/issue.component';



@NgModule({
  declarations: [
    ProjectComponent,
    IssueComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
