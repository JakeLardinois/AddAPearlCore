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
	MaterialModule,
	MdNativeDateModule,
} from '@angular/material';
import {
	BrowserModule,
} from '@angular/platform-browser';
import {
	RouterModule,
} from '@angular/router';
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
		MdNativeDateModule,
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
		ItemService,
	],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class CustomerModule {}
