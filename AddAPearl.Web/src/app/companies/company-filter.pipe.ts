import { Pipe, PipeTransform } from '@angular/core';

import { ICompany } from '../shared/models/company';

@Pipe({
    name: 'companyFilter',
})
export class CompanyFilterPipe implements PipeTransform {

    public transform(value: ICompany[], filterBy: string): ICompany[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((company: ICompany) =>
            company.companyName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
