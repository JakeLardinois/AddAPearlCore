import { Component } from '@angular/core';

@Component({
    selector: 'pearl-companies',
    templateUrl: 'app/companies/company-list.component.html'
})
export class CompanyListComponent {
    pageTitle: string = 'Company List';
    companies: any[] = [
        {
            "companyId": 1,
            "companyName": "Jake Lardinois LLC"
        },
        {
            "companyId": 2,
            "companyName": "Draeb Jewelers"
        },
        {
            "companyId": 3,
            "companyName": "Connor Jewelers"
        }
    ];

    clicked(message:string): void {
        alert(message);
    }
}