import { Component } from '@angular/core';
import {MdDialogRef, MdSnackBar, MdSnackBarConfig} from '@angular/material';

import { IAddress } from '../index';
import { AddressService } from '../services/address.service';

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
  public newAddress: IAddress;
  public errorMessage: string;

  public constructor(public dialogRef: MdDialogRef<AddressDialog>, public snackBar: MdSnackBar, public addressService: AddressService) {

  }

  public updateAddress(): void {
    let observer = jsonpatch.observe( this.address );
    this.address.addressLine1 = 'New Address';
    let patches = jsonpatch.generate(observer);

    this.addressService.patchAddress(this.address, patches)
      .subscribe((address) => this.address = address,
        (error) => this.errorMessage = <any> error);
    let config = new MdSnackBarConfig();
    config.duration = 5000;
    this.snackBar.open('Address Updated: ' + this.address.addressLine1, 'Ok', config);
    this.dialogRef.close('updated');
  }
}
