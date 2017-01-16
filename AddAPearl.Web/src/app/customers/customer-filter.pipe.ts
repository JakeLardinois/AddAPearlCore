import {
	Pipe,
	PipeTransform,
} from '@angular/core';

import {
	ICustomer,
} from '../shared/index';

@Pipe({
	name: 'customerFilter',
})
export class CustomerFilterPipe implements PipeTransform {

	public transform(value: ICustomer[], filterBy: string): ICustomer[] {
		filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
		return filterBy ? value.filter((customer: ICustomer) =>
			customer.lastName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
	}
}
