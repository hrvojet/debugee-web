import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LabelService } from '../../shared/services/label.service';
import { ILabel } from '../../shared/models/label.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LabelDialogComponent } from './label-dialog/label-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-label',
	templateUrl: './label.component.html',
	styleUrls: ['./label.component.css'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class LabelComponent implements OnInit, AfterViewInit {
	name = new FormControl('');
	description = new FormControl('');
	colorHex = new FormControl('');

	labels: ILabel[] | undefined;
	displayedColumns: string[] = ['name', 'description'];
	displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];
	expandedLabel!: ILabel | null;
	currentlyEditingLabel: ILabel | undefined;

	constructor(private labelService: LabelService, private route: ActivatedRoute, private dialog: MatDialog) {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.labelService
			.getAllLabelsForProject(Number(this.route.snapshot.paramMap.get('projectId')))
			.subscribe((data) => {
				this.labels = data;
			});
	}

	openDialog(row: ILabel | null) {
		this.dialog.open(LabelDialogComponent, {
			data: {
				label: row,
			},
			width: '450px',
		});
	}

	deleteRow(row: ILabel) {
		// TODO deletion dialog
		console.log('delete row: ' + row.name);
	}

	onNameInputChange(name: FormControl): void {
		const value = name.value;
		this.currentlyEditingLabel!.name = value ? value : 'Preview';
	}

	onDescriptionInputChange(description: FormControl): void {
		const value = description.value;
		this.currentlyEditingLabel!.description = value ? value : '';
	}

	onColorInputChange(colorHex: FormControl): void {
		const value = colorHex;
		this.currentlyEditingLabel!.colorHex = value.value;
	}

	setCurrentlyEditingLabel(label: ILabel): void {
		// this.currentlyEditingLabel = label; // bug sending pass by reference!!! need pass by value
		this.currentlyEditingLabel = JSON.parse(JSON.stringify(label));
		this.name.setValue(this.currentlyEditingLabel!.name);
		this.description.setValue(this.currentlyEditingLabel!.description);
		this.colorHex.setValue(this.currentlyEditingLabel!.colorHex);
	}

	saveLabel(): void {
		console.log('saved: ' + JSON.stringify(this.currentlyEditingLabel));
	}

	cancelLabelEdit(): void {
		this.currentlyEditingLabel = undefined;
	}

	/*openDialog(row: ILabel) {
		console.log(row);
		this.dialog.open(LabelDialogComponent, {
			data: {
				id: row.id,
				name: row.name,
				description: row.description,
				colorHex: row.colorHex,
			},
		});
	}*/
}
