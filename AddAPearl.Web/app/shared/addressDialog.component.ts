import { Component } from '@angular/core';
import {MdDialogRef} from '@angular/material';

import { IAddress } from '../shared/models/address';


@Component({
  selector: 'address-dialog',
  moduleId: module.id,
  templateUrl: 'addressDialog.component.html'
})
export class AddressDialog {
    address: IAddress;
  constructor(public dialogRef: MdDialogRef<AddressDialog>) { }
}