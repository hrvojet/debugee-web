import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LabelService } from '../../shared/services/label.service';
import { ILabel } from '../../shared/models/label.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LabelDialogComponent } from './label-dialog/label-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';

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

	newLabelForm: FormGroup;

	showNewLabelDIV = false;

	isLabelEditableByCurrentUser!: boolean;

	@ViewChild(MatTable) table!: MatTable<ILabel>;
	labels: ILabel[] | undefined;
	displayedColumns: string[] = ['name', 'description'];
	displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];
	expandedLabel!: ILabel | null;
	currentlyEditingLabel: ILabel | undefined;

	constructor(
		private labelService: LabelService,
		private route: ActivatedRoute,
		private dialog: MatDialog,
		private fb: FormBuilder
	) {
		this.newLabelForm = fb.group({
			newName: ['', [Validators.required]],
			newDescription: [''],
			newColorHex: ['', [Validators.required]],
		});

		this.isLabelEditableByCurrentUser = localStorage.getItem('ilebcu') === 'y';
	}

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
		this.labelService.deleteLabel(row.id).subscribe(() => {
			this.labels = this.labels?.filter((l) => l.id !== row.id);
			this.table.renderRows();
		});
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
		console.log(this.labels);
		this.currentlyEditingLabel = JSON.parse(JSON.stringify(label));
		this.name.setValue(this.currentlyEditingLabel!.name);
		this.description.setValue(this.currentlyEditingLabel!.description);
		this.colorHex.setValue(this.currentlyEditingLabel!.colorHex);
	}

	updateLabel(labelID: number): void {
		const updateLabelIndex = this.labels?.map((l) => l.id).indexOf(labelID);

		if (this.currentlyEditingLabel && updateLabelIndex !== undefined) {
			this.labelService
				.editLabel(labelID, {
					name: this.currentlyEditingLabel.name,
					description: this.currentlyEditingLabel.description,
					colorHex: this.currentlyEditingLabel.colorHex,
				})
				.subscribe((res) => {
					console.log(res);
					this.labels![updateLabelIndex] = res;
					this.table.renderRows();
				});
		}
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

	resetNewLabel() {
		this.newLabelForm.reset();
	}

	saveNewLabel() {
		this.labelService
			.saveLabelForProject(Number(this.route.snapshot.paramMap.get('projectId')), {
				name: this.newLabelForm.controls['newName'].value,
				description: this.newLabelForm.controls['newDescription'].value,
				colorHex: this.newLabelForm.controls['newColorHex'].value,
			})
			.subscribe((res) => {
				this.labels?.push(res);
				this.table.renderRows();
				this.newLabelForm.reset();
			});
	}
}
