import { Component } from '@angular/core';
import {MdDialogRef, MdSnackBar, MdSnackBarConfig} from '@angular/material';

import { IAddress } from '../models/address';

@Component({
  moduleId: module.id,
  selector: 'address-dialog',
  styleUrls: ['addressDialog.component.css'],
  templateUrl: 'addressDialog.component.html',
})

export class AddressDialog {
  public addressName: string;
  public address: IAddress;
  constructor(public dialogRef: MdDialogRef<AddressDialog>, public snackBar: MdSnackBar) { }

  public updateAddress(): void {
      let config = new MdSnackBarConfig();
        config.duration = 5000;
        this.snackBar.open('Address Updated: ' + this.address.addressLine1, 'Ok', config);
        this.dialogRef.close('updated');
  }
}
