import { Component} from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar, MdSnackBarConfig} from '@angular/material';

import { AddressDialog, CompanyService, IAddress, ICompany } from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'pearl-companies',
    styleUrls: ['company-list.component.css'],
    templateUrl: 'company-list.component.html',
})

export class CompanyListComponent {
    public pageTitle: string = 'Company List';
    public errorMessage: string;
    public dialogRef: MdDialogRef<AddressDialog>;
    public listFilter: string = null;
    public companies: ICompany[];

    public constructor(private companyService: CompanyService, public dialog: MdDialog, public snackBar: MdSnackBar) {

    }

    public clicked(companyName: string, address: IAddress): void {
        this.dialogRef = this.dialog.open(AddressDialog, {
            disableClose: false,
        });
        this.dialogRef.componentInstance.addressName = companyName;
        this.dialogRef.componentInstance.address = address;

        this.dialogRef.afterClosed().subscribe((result) => {
            console.log('result: ' + result);
            this.dialogRef = null;
        });
    }

    public onRatingClicked(message: string): void {
        let config = new MdSnackBarConfig();
        config.duration = 1;
        this.snackBar.open(message, 'Dismiss', config);
        this.pageTitle = 'Product List: ' + message;
    }

    protected ngOnInit(): void {
        this.companyService.getCompanies()
                .subscribe((companies) => this.companies = companies,
                           (error) => this.errorMessage = <any> error);
    }
}
