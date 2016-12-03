import { Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar, MdSnackBarConfig} from '@angular/material';

import { ICompany } from '../shared/models/company';
import { IAddress } from '../shared/models/address';
import { AddressDialog } from '../shared/addressDialog.component';
import { CompanyService } from '../shared/services/company.service';


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

    constructor(private _companyService: CompanyService, public dialog: MdDialog, public snackBar: MdSnackBar) {

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

    onRatingClicked(message: string): void {
        let config = new MdSnackBarConfig();
        //config.duration = 1;
        this.snackBar.open(message, 'Dismiss', config);
        this.pageTitle = 'Product List: ' + message;
    }
}