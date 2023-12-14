import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IssueService} from "../../../shared/services/issue.service";
import {Router} from "@angular/router";
import {IIssue} from "../../../shared/models/issue.model";

@Component({
  selector: 'app-delete-issue',
  templateUrl: './delete-issue.component.html',
  styleUrls: ['./delete-issue.component.css']
})
export class DeleteIssueComponent implements OnInit {
  issue: IIssue;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { issue: IIssue },
    private issueService: IssueService,
    private dialogRef: MatDialogRef<DeleteIssueComponent>,
    private router: Router
  ) {
    this.issue = data.issue;
  }

  ngOnInit(): void {
  }

  deleteIssue() {
    this.issueService.deleteIssue(this.issue.id).subscribe(() => {
      this.dialogRef.close();
      void this.router.navigate([`projects/${this.issue.projectId}`]);
    });
  }
}
