import {Component, Inject, OnInit} from '@angular/core';
import {IIssue} from "../../../shared/models/issue.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IssueService} from "../../../shared/services/issue.service";

@Component({
  selector: 'app-lock-issue',
  templateUrl: './lock-issue.component.html',
  styleUrls: ['./lock-issue.component.css']
})
export class LockIssueComponent implements OnInit {
  issue: IIssue;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { issue: IIssue },
    private issueService: IssueService,
    private dialogRef: MatDialogRef<LockIssueComponent>
  ) {
    this.issue = data.issue;
  }

  ngOnInit(): void {
  }


  lockIssue() {
    this.issueService.patchIssue(this.issue.id, null, false).subscribe(res => {
      this.dialogRef.close(res);
    });
  }

  unlockIssue() {
    this.issueService.patchIssue(this.issue.id, null, true).subscribe(res => {
      this.dialogRef.close(res);
    });
  }
}
