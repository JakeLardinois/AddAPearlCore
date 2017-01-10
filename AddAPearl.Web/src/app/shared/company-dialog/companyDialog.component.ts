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
	public errorMessage: string;
	public companyForm: FormGroup;
	public observer: any;
	public apiValidationErrors: any;
	private snackBarConfig = new MdSnackBarConfig();

	public constructor(public dialogRef: MdDialogRef < CompanyDialog > , public snackBar: MdSnackBar, public companyService: CompanyService) {
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
					this.handleError(error);
					this.snackBar.open('Company Failed to be Created: ' + this.errorMessage, 'Ok', this.snackBarConfig);
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
						this.handleError(error);
						this.snackBar.open('Company Failed to be Updated: ' + this.errorMessage, 'Ok', this.snackBarConfig);
					});
		}
	}

	protected ngOnInit(): void {
		this.snackBarConfig.duration = 5000;

		this.companyForm = new FormGroup({
			companyEmailValidator: new FormControl('', CustomValidators.email),
			companyNameValidator: new FormControl('', Validators.required),
		});

		this.observer = jsonpatch.observe(this.company);
	}

	private handleError(error: any): void {
		let messageBody = JSON.parse(error._body);

		if (messageBody) { // Validation errors were passed back from the API
			this.errorMessage = error.statusText;
			this.apiValidationErrors = messageBody;
		} else {
			this.errorMessage = error;
		}
		console.log(error);
	}
}
