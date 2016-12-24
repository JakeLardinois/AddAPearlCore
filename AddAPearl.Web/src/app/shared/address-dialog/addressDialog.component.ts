import { Component } from '@angular/core';
import {MdDialogRef} from '@angular/material';

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
  constructor(public dialogRef: MdDialogRef<AddressDialog>) { }

  public updateAddress(): void {
      alert('fired!!');
  }
}
