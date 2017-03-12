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
	IAddress,
} from '../index';
import {
	AddressService,
} from '../services/address.service';

import * as jsonpatch from 'fast-json-patch';

@Component({
	moduleId: module.id,
	selector: 'address-dialog',
	styleUrls: ['addressDialog.component.css'],
	templateUrl: 'addressDialog.component.html',
})

export class AddressDialog {
	public addressName: string;
	public address: IAddress;
	public addressForm: FormGroup;
	public observer: any;
	public apiValidationErrors: any;
	private snackBarConfig = new MdSnackBarConfig();

	public constructor(
		public dialogRef: MdDialogRef < AddressDialog >,
		public snackBar: MdSnackBar,
		public addressService: AddressService,
		private logger: Logger,
	) {
		this.apiValidationErrors = {};
	}

	public updateAddress(): void {
		if (this.address.addressId == null) { // checks if null or undefined
			this.addressService.createAddress(this.address)
				.then((address) => {
					this.address = address;
					this.snackBar.open(`Address ${this.address.addressId} Created: `, 'Ok', this.snackBarConfig);
					this.dialogRef.close(this.address);
				})
				.catch((error) => {
					this.snackBar.open('Address Failed to be Created.', 'Ok', this.snackBarConfig);
					this.handleError(error);
				});
		} else {
			let patches = jsonpatch.generate(this.observer);

			this.addressService.patchAddress(this.address, patches)
				.subscribe(
					(address) => {
						this.address = address;
						this.snackBar.open(`Address ${this.address.addressId} Updated`, 'Ok', this.snackBarConfig);
						this.dialogRef.close(this.address);
					},
					(error) => {
						this.snackBar.open('Address Failed to be Updated.', 'Ok', this.snackBarConfig);
						this.handleError(error);
					});
		}
	}

	protected ngOnInit(): void {
		this.snackBarConfig.duration = 5000;

		this.addressForm = new FormGroup({
			addressCity: new FormControl(this.address.city, Validators.required),
			addressLine1: new FormControl(this.address.addressLine1),
			addressLine2: new FormControl(this.address.addressLine2),
			addressLine3: new FormControl(this.address.addressLine3),
			addressState: new FormControl(this.address.state),
			addressZipCode: new FormControl(this.address.zipCode),
		});

		this.observer = jsonpatch.observe(this.address);
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
