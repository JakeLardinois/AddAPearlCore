import {
	Component,
} from '@angular/core';
import {
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import {
	MdDialogRef,
	MdSnackBar,
	MdSnackBarConfig,
} from '@angular/material';
import {
	Logger,
} from 'angular2-logger/core';
import {
	CustomValidators,
} from 'ng2-validation';

import {
	ICustomer,
} from '../index';
import {
	CustomerService,
} from '../services/customer.service';

import * as jsonpatch from 'fast-json-patch';

@Component({
	moduleId: module.id,
	selector: 'customer-dialog',
	styleUrls: ['customerDialog.component.css'],
	templateUrl: 'customerDialog.component.html',
})

export class CustomerDialog {
	public customer: ICustomer;
	public customerForm: FormGroup;
	public observer: any;
	public apiValidationErrors: any;
	private snackBarConfig = new MdSnackBarConfig();

	public constructor(
		public dialogRef: MdDialogRef < CustomerDialog >,
		public snackBar: MdSnackBar,
		public customerService: CustomerService,
		private logger: Logger,
	) {
		this.apiValidationErrors = {};
	}

	public updateCustomer(): void {
		if (this.customer.customerId == null) { // checks if null or undefined
			this.customerService.createCustomer(this.customer)
				.then((customer) => {
					this.customer = customer;
					this.snackBar.open(`Customer ${customer.customerId}  Created: `, 'Ok', this.snackBarConfig);
					this.dialogRef.close(this.customer);
				})
				.catch((error) => {
					this.snackBar.open('Customer Failed to be Created.' , 'Ok', this.snackBarConfig);
					this.handleError(error);
				});
		} else {
			let patches = jsonpatch.generate(this.observer);

			this.customerService.patchCustomer(this.customer, patches)
				.subscribe(
					(customer) => {
						this.customer = customer;
						this.snackBar.open(`Updated ${this.customer.firstName} ${this.customer.lastName}`, 'Ok', this.snackBarConfig);
						this.dialogRef.close(this.customer);
					},
					(error) => {
						this.snackBar.open('Customer Failed to be Updated.', 'Ok', this.snackBarConfig);
						this.handleError(error);
					});
		}
	}

	protected ngOnInit(): void {
		this.snackBarConfig.duration = 5000;

		this.customerForm = new FormGroup({
			customerBirthDayValidator: new FormControl('', CustomValidators.date),
			customerEmailValidator: new FormControl('', CustomValidators.email),
			customerFirstNameValidator: new FormControl('', Validators.required),
			customerLastNameValidator: new FormControl('', Validators.required),
			customerPhoneNumberValidator: new FormControl('', CustomValidators.phone('en-US')),
		});

		this.observer = jsonpatch.observe(this.customer);
	}

	private handleError(error: any): void {
		let messageBody = JSON.parse(error._body);

		if (messageBody) { // Validation errors were passed back from the API
			this.logger.error('API Validation Errors. Status: ' + error.statusText);
			this.apiValidationErrors = messageBody;
		} else {
			this.logger.error(error);
		}
	}
}
