export interface ILabel {
	id: number;
	name: string;
	description: string;
	colorHex: string;
}

export interface ILabelPost {
	name: string;
	description: string;
	colorHex: string;
}

export interface ILabelUpdateIssue {
	addLabelsWithID: number[];
	removeLabelsWithID: number[];
}
