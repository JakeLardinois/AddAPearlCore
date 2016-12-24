import { Component } from '@angular/core';
import {MdDialogRef} from '@angular/material';

import { AddressService, IAddress } from '../index';

@Component({
  moduleId: module.id,
  selector: 'address-dialog',
  styleUrls: ['addressDialog.component.css'],
  templateUrl: 'addressDialog.component.html',
})

export class AddressDialog {
  public addressName: string;
  public address: IAddress;
  public addressService: AddressService;
  public errorMessage: string;

  public constructor(public dialogRef: MdDialogRef<AddressDialog>) { }

  public updateAddress(): void {
      this.addressService.updateAddress(this.address)
                .subscribe((address) => this.address = address,
                           (error) => this.errorMessage = <any> error);
      this.dialogRef.close('updated');
  }
}
