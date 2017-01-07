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

import jsonpatch = require('fastJsonPatch/json-patch-duplex.min');

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

	public constructor(public dialogRef: MdDialogRef < AddressDialog > , public snackBar: MdSnackBar, public addressService: AddressService) {
		this.apiValidationErrors = {};
	}

	public updateAddress(): void {
		let config = new MdSnackBarConfig();
		config.duration = 5000;

		if (this.address.addressId == null) { // checks if null or undefined
			this.addressService.createAddress(this.address)
				.then((address) => {
					this.address = address;
					this.snackBar.open('Address ' + this.address.addressId + ' Created: ', 'Ok', config);
					this.dialogRef.close(this.address);
				})
				.catch((error) => {
					let messageBody = JSON.parse(error._body);

					if (messageBody) { // if validation errors were passed back from the API
						this.errorMessage = error.statusText;
						this.apiValidationErrors = messageBody;
					} else {
						this.errorMessage = error;
					}
					this.snackBar.open('Address Failed to be Created: ' + this.errorMessage, 'Ok', config);
					console.log(error);
				});
		} else {
			let patches = jsonpatch.generate(this.observer);

			this.addressService.patchAddress(this.address, patches)
				.subscribe(
					(address) => {
						this.address = address;
						this.snackBar.open('Address Updated: ' + this.address.addressLine1, 'Ok', config);
						this.dialogRef.close(this.address);
					},
					(error) => {
						this.errorMessage = < any > error;
						this.snackBar.open('Address Failed to be Updated: ' + this.errorMessage, 'Ok', config);
						console.log(error);
					});
		}
	}

	protected ngOnInit(): void {
		this.observer = jsonpatch.observe(this.address);
	}
}
