import {
	Component,
} from '@angular/core';
import {
	MdDialogRef,
	MdSnackBar,
	MdSnackBarConfig,
} from '@angular/material';

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
	public errorMessage: string;
	public observer: any;
	public apiValidationErrors: any;
	private snackBarConfig = new MdSnackBarConfig();

	public constructor(public dialogRef: MdDialogRef < AddressDialog > , public snackBar: MdSnackBar, public addressService: AddressService) {
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
					this.handleError(error);
					this.snackBar.open(`Address Failed to be Created: ${this.errorMessage}`, 'Ok', this.snackBarConfig);
				});
		} else {
			let patches = jsonpatch.generate(this.observer);

			this.addressService.patchAddress(this.address, patches)
				.subscribe(
					(address) => {
						this.address = address;
						this.snackBar.open(`Address Updated`, 'Ok', this.snackBarConfig);
						this.dialogRef.close(this.address);
					},
					(error) => {
						this.handleError(error);
						this.snackBar.open(`Address Failed to be Updated: ${this.errorMessage}`, 'Ok', this.snackBarConfig);
					});
		}
	}

	protected ngOnInit(): void {
		this.snackBarConfig.duration = 5000;

		this.observer = jsonpatch.observe(this.address);
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
