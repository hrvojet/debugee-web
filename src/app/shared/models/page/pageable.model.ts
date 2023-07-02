import { ISort } from './sort.model';

export interface IPageable {
	offset: number;
	pageNumber: number;
	pageSize: number;
	paged: boolean;
	sort: ISort;
	unpaged: boolean;
}
