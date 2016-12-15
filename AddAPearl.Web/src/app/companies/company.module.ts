import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RouterModule} from '@angular/router';

import { CompanyService } from '../shared/services/company.service';
import { CompanyListComponent }  from './company-list.component';
import { CompanyFilterPipe } from './company-filter.pipe';
import { AddressDialog, StarComponent }  from '../shared/index';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot(),
    RouterModule.forChild([
      { path: 'companies', component: CompanyListComponent }
    ])
  ],
  declarations: [
    CompanyListComponent,
    AddressDialog,
    CompanyFilterPipe,
    StarComponent
  ],
  entryComponents: [
    AddressDialog
  ],
  providers: [
    CompanyService
  ]
})
export class CompanyModule {}
