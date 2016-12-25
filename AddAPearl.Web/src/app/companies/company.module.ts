import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';

import { AddressDialog, AddressService, CompanyService, StarComponent }  from '../shared/index';
import { CompanyFilterPipe } from './company-filter.pipe';
import { CompanyListComponent }  from './company-list.component';

@NgModule({
  declarations: [
    CompanyListComponent,
    AddressDialog,
    CompanyFilterPipe,
    StarComponent,
  ],
  entryComponents: [
    AddressDialog,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot(),
    RouterModule.forChild([
      { path: 'companies', component: CompanyListComponent },
    ]),
  ],
  providers: [
    AddressService,
    CompanyService,
  ],
})

export class CompanyModule {}
