import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

import { ICompany } from './company';
import { IAddress } from './address';
import { CompanyService } from './company.service';

@Component({
    selector: 'pearl-companies',
    moduleId: module.id,
    templateUrl: 'company-list.component.html',
    styleUrls: ['company-list.component.css']
})
export class CompanyListComponent {
    pageTitle: string = 'Company List';
    errorMessage: string;
    dialogRef: MdDialogRef<AddressDialog>;
    listFilter: string = null;
    
    companies: ICompany[];

    constructor(private _companyService: CompanyService, public dialog: MdDialog) {

    }

    ngOnInit(): void {
        this._companyService.getCompanies()
                .subscribe(companies => this.companies = companies,
                           error => this.errorMessage = <any>error);
    }

    clicked(address:IAddress): void {
        //alert(address.addressLine1);
        this.dialogRef = this.dialog.open(AddressDialog, {
            disableClose: false
        });
        this.dialogRef.componentInstance.address = address;

        this.dialogRef.afterClosed().subscribe(result => {
            console.log('result: ' + result);
            this.dialogRef = null;
        });
    }
}

@Component({
  selector: 'pizza-dialog',
  template: `
  {{address.addressLine1}}
  <br>
  {{address.city + ', ' + address.state + ' ' + address.zipCode}}
  <br>
  Do you like my address Dialog?
  <br>
  <button type="button" (click)="dialogRef.close('yes')">Yes</button>
  <button type="button" (click)="dialogRef.close('no')">No</button>
  `
})
export class AddressDialog {
    address: IAddress;
  constructor(public dialogRef: MdDialogRef<AddressDialog>) { }
}