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
	ICompany,
	ICustomer,
} from '../index';
import {
	CompanyService,
} from '../services/company.service';
import {
	CustomerService,
} from '../services/customer.service';

import * as jsonpatch from 'fast-json-patch';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
	moduleId: module.id,
	selector: 'necklace-dialog',
	styleUrls: ['necklaceDialog.component.css'],
	templateUrl: 'necklaceDialog.component.html',
})

export class NecklaceDialog {
	public customer: ICustomer;
	public customerForm: FormGroup;
	public companies: ICompany[];
	public observer: any;
	public apiValidationErrors: any;
	private snackBarConfig = new MdSnackBarConfig();

	public constructor(
		public dialogRef: MdDialogRef < NecklaceDialog >,
		public snackBar: MdSnackBar,
		public customerService: CustomerService,
		private companyService: CompanyService,
		private logger: Logger,
	) {
		this.apiValidationErrors = {};
		this.companyService.getCompanies()
			.subscribe((companies) => {
				this.companies = companies;
			},
				(error) => this.logger.error(error));
	}

	protected ngOnInit(): void {
		this.snackBarConfig.duration = 5000;

		if (this.customer.birthDay === null) {
			this.customer.birthDay = new Date().toISOString();
		}

		let foundCompany = _.find(this.companies, { companyId: this.customer.companyId });
		if (!foundCompany) {
			foundCompany = this.customer.company;
			this.companies = [foundCompany];
		}

		this.customerForm = new FormGroup({
			companyId: new FormControl(foundCompany.companyId),
			customerBirthDay: new FormControl(this.customer.birthDay, CustomValidators.date),
			customerEmail: new FormControl(this.customer.email, CustomValidators.email),
			customerFirstName: new FormControl(this.customer.firstName, Validators.required),
			customerLastName: new FormControl(this.customer.lastName, Validators.required),
			customerPhoneNumber: new FormControl(this.customer.phoneNumber, CustomValidators.phone('US')),
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
