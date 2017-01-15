import {
	Component,
} from '@angular/core';
import {
	MdDialog,
	MdDialogRef,
	MdSnackBar,
	MdSnackBarConfig,
} from '@angular/material';

import {
	Logger,
} from 'angular2-logger/core';

@Component({
	moduleId: module.id,
	selector: 'pearl-customers',
	styleUrls: ['customer-list.component.css'],
	templateUrl: 'customer-list.component.html',
})

export class CustomerListComponent {
	public pageTitle: string = 'Customer List';

	public constructor(
		private logger: Logger,
	) {
		// constructor code...
	}

	protected ngOnInit(): void {
		// Initilization Code...
	}
}
