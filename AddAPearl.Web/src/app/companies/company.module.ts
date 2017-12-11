import {
  MdlModule,
} from '@angular-mdl/core';
import {
  NgModule,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MaterialModule,
} from '../shared/material.module';
import {
  MatHint,
} from '@angular/material';
import {
  BrowserModule,
} from '@angular/platform-browser';
import {
  CustomFormsModule,
} from 'ng2-validation';

import {
  AddressDialog,
  AddressService,
  CompanyDialog,
  CompanyService,
  StarComponent,
} from '../shared/index';
import {
  CompanyFilterPipe,
} from './company-filter.pipe';
import {
  CompanyListComponent,
} from './company-list.component';
import {
  CompanyRoutingModule
} from './company-routing.module';

@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyDialog,
    CompanyFilterPipe,
    StarComponent,
  ],
  entryComponents: [
    AddressDialog,
    CompanyDialog,
  ],
  imports: [
    BrowserModule,
    CustomFormsModule,
    FormsModule,
    MaterialModule,
    MdlModule,
    ReactiveFormsModule,
    CompanyRoutingModule,
  ],
  providers: [
    AddressService,
    CompanyService,
  ],
})

export class CompanyModule {}
