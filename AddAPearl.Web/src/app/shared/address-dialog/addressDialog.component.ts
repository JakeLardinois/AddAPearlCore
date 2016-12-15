import { Component } from '@angular/core';
import {MdDialogRef} from '@angular/material';

import { IAddress } from '../models/address';


@Component({
  selector: 'address-dialog',
  moduleId: module.id,
  templateUrl: 'addressDialog.component.html',
  styleUrls: ['addressDialog.component.css']
})
export class AddressDialog {
    addressName: string;
    address: IAddress;
  constructor(public dialogRef: MdDialogRef<AddressDialog>) { }

  updateAddress(): void {
      alert('fired!!');
  }
}