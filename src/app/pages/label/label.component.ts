import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LabelService } from '../../shared/services/label.service';
import { ILabel, ILabelPost } from '../../shared/models/label.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LabelDialogComponent } from './label-dialog/label-dialog.component';

@Component({
	selector: 'app-label',
	templateUrl: './label.component.html',
	styleUrls: ['./label.component.css'],
})
export class LabelComponent implements OnInit, AfterViewInit {
	labels: ILabel[] | undefined;
	displayedCoumns: string[] = ['name', 'description', 'buttons'];
	hexValue = '#fff';

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
