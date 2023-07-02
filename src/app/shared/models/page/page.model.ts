import { IPageable } from './pageable.model';
import { ISort } from './sort.model';

export interface IPage<T> {
	content: T[];
	empty: boolean;
	first: boolean;
	last: boolean;
	number: number;
	numberOfElements: number;
	pageable: IPageable;
	size: number;
	sort: ISort;
	totalElements: number;
	totalPages: number;
}
