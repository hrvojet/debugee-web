import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComment } from '../../../shared/models/comment.model';

@Component({
	selector: 'app-input-comment',
	templateUrl: './input-comment.component.html',
	styleUrls: ['./input-comment.component.css'],
})
export class InputCommentComponent implements OnInit {
	@Input() isEditing!: boolean; // TODO maybe enum flag for editing/posting new
	@Input() comment: IComment | undefined;

	@Output() updatedComment = new EventEmitter<IComment>();
	// https://angular.io/guide/inputs-outputs#sending-data-to-a-parent-component
	markdown!: string;

	constructor() {}

	ngOnInit(): void {
		if (this.comment) {
			this.markdown = this.comment.text;
		}
	}

	updateComment(value: string) {
		this.comment!.text = value;
		this.updatedComment.emit(this.comment);
	}
}
