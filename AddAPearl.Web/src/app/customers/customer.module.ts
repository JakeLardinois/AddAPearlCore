import {
  MdlModule,
} from '@angular-mdl/core';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MaterialModule
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
  CustomerDialog,
  CustomerService,
  ItemDialog,
  ItemService,
} from '../shared/index';
import {
  CustomerFilterPipe,
} from './customer-filter.pipe';
import {
  CustomerListComponent,
} from './customer-list.component';
import {
  CustomerRoutingModule
} from './customer-routing.module';

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerDialog,
    CustomerFilterPipe,
    ItemDialog,
  ],
  entryComponents: [
    AddressDialog,
    CustomerDialog,
    ItemDialog,
  ],
  imports: [
    BrowserModule,
    CustomFormsModule,
    FormsModule,
    MaterialModule,
    MdlModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
  ],
  providers: [
    AddressService,
    CustomerService,
    ItemService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class CustomerModule {}
