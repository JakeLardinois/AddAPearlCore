import { Component } from '@angular/core';
import {MdDialogRef, MdSnackBar, MdSnackBarConfig} from '@angular/material';

import { AddressService } from '../services/address.service';
import { IAddress } from '../index';


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

  public constructor(public dialogRef: MdDialogRef<AddressDialog>, public snackBar: MdSnackBar, public addressService: AddressService) {

  }

  public updateAddress(): void {
    this.addressService.updateAddress(this.address)
      .subscribe((address) => this.address = address,
        (error) => this.errorMessage = <any> error);
    let config = new MdSnackBarConfig();
    config.duration = 5000;
    this.snackBar.open('Address Updated: ' + this.address.addressLine1, 'Ok', config);
    this.dialogRef.close('updated');
  }
}
