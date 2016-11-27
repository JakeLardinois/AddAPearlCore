import { Component, OnInit } from '@angular/core';

import { ICompany } from './company';
import { IAddress } from './address';
import { CompanyService } from './company.service';

@Component({
    selector: 'pearl-companies',
    templateUrl: 'app/companies/company-list.component.html'
})
export class CompanyListComponent {
    pageTitle: string = 'Company List';
    errorMessage: string;
    
    companies: ICompany[];

    constructor(private _companyService: CompanyService) {

    }

    ngOnInit(): void {
        this._companyService.getCompanies()
                .subscribe(companies => this.companies = companies,
                           error => this.errorMessage = <any>error);
    }

    clicked(address:IAddress): void {
        alert(address.addressLine1);
    }
}