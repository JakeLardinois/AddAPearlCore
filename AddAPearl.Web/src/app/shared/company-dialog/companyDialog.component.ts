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
} from '../index';
import {
	CompanyService,
} from '../services/company.service';

import * as jsonpatch from 'fast-json-patch';

@Component({
	moduleId: module.id,
	selector: 'company-dialog',
	styleUrls: ['companyDialog.component.css'],
	templateUrl: 'companyDialog.component.html',
})

export class CompanyDialog {
	public company: ICompany;
	public companyForm: FormGroup;
	public observer: any;
	public apiValidationErrors: any;
	private snackBarConfig = new MdSnackBarConfig();

	public constructor(
		public dialogRef: MdDialogRef < CompanyDialog >,
		public snackBar: MdSnackBar,
		public companyService: CompanyService,
		private logger: Logger,
	) {
		this.apiValidationErrors = {};
	}

	public updateCompany(): void {
		if (this.company.companyId == null) { // checks if null or undefined
			this.companyService.createCompany(this.company)
				.then((company) => {
					this.company = company;
					this.snackBar.open(`Company ${company.companyId}  Created: `, 'Ok', this.snackBarConfig);
					this.dialogRef.close(this.company);
				})
				.catch((error) => {
					this.snackBar.open('Company Failed to be Created.' , 'Ok', this.snackBarConfig);
					this.handleError(error);
				});
		} else {
			let patches = jsonpatch.generate(this.observer);

			this.companyService.patchCompany(this.company, patches)
				.subscribe(
					(company) => {
						this.company = company;
						this.snackBar.open(`Updated ${this.company.companyName}`, 'Ok', this.snackBarConfig);
						this.dialogRef.close(this.company);
					},
					(error) => {
						this.snackBar.open('Company Failed to be Updated.', 'Ok', this.snackBarConfig);
						this.handleError(error);
					});
		}
	}

	protected ngOnInit(): void {
		this.snackBarConfig.duration = 5000;

		this.companyForm = new FormGroup({
			companyEmail: new FormControl(this.company.email, CustomValidators.email),
			companyName: new FormControl(this.company.companyName, Validators.required),
		});

		this.observer = jsonpatch.observe(this.company);
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
