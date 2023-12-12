import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IComment } from '../../../shared/models/comment.model';
import { InputCommentTypeEnum } from '../types/InputCommentType.enum';

@Component({
	selector: 'app-input-comment',
	templateUrl: './input-comment.component.html',
	styleUrls: ['./input-comment.component.css'],
})
export class InputCommentComponent implements OnInit {
	inputCommentType = InputCommentTypeEnum;
	@Input() commentType!: InputCommentTypeEnum; // TODO maybe enum flag for editing/posting new
	@Input() comment: IComment | undefined;

	@Output() updatedComment = new EventEmitter<IComment>();
	@Output() saveNewComment = new EventEmitter<string>();

	markdown!: string;
	@ViewChild('markdownFocus') markdownFocus!: ElementRef;

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

	cancelCommentUpdate() {
		this.updatedComment.emit(undefined);
	}

	saveComment(markdown: string) {
		this.saveNewComment.emit(markdown);
		this.markdown = '';
	}
}
