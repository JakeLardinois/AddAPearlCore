import {
	NgModule,
} from '@angular/core';
import {
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import {
	MaterialModule,
} from '@angular/material';
import {
	BrowserModule,
} from '@angular/platform-browser';
import {
	RouterModule,
} from '@angular/router';
import {
	MdlModule,
} from 'angular2-mdl';
import {
	CustomFormsModule,
} from 'ng2-validation';

import {
	AddressService,
    CustomerService,
} from '../shared/index';
import {
	CustomerFilterPipe,
} from './customer-filter.pipe';
import {
	CustomerListComponent,
} from './customer-list.component';

@NgModule({
	declarations: [
		CustomerListComponent,
		CustomerFilterPipe,
	],
	entryComponents: [
	],
	imports: [
		BrowserModule,
		CustomFormsModule,
		FormsModule,
		MaterialModule.forRoot(),
		MdlModule,
		ReactiveFormsModule,
		RouterModule.forChild([{
			component: CustomerListComponent,
			path: 'customers',
		}]),
	],
	providers: [
		AddressService,
		CustomerService,
	],
})

export class CustomerModule {}
