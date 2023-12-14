import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ILabel } from '../../../shared/models/label.model';

@Component({
	selector: 'app-label-dialog',
	templateUrl: './label-dialog.component.html',
	styleUrls: ['./label-dialog.component.css'],
})
export class LabelDialogComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public data: { label: ILabel }) {}

	ngOnInit(): void {}
}
