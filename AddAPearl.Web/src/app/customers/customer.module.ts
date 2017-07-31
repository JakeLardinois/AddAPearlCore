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
} from '@angular/material';
import {
	BrowserModule,
} from '@angular/platform-browser';
import {
	RouterModule,
} from '@angular/router';
import {
	PolymerModule ,
} from '@codebakery/origami';
import {
	MdlModule,
} from 'angular2-mdl';
import {
	CustomFormsModule,
} from 'ng2-validation';

import {
	AddressDialog,
	AddressService,
	CustomerDialog,
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
		CustomerDialog,
		CustomerFilterPipe,
	],
	entryComponents: [
		AddressDialog,
		CustomerDialog,
	],
	imports: [
		BrowserModule,
		CustomFormsModule,
		FormsModule,
		MaterialModule,
		MdlModule,
		PolymerModule.forRoot(), // Only import .forRoot() once and at the highest level
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
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class CustomerModule {}
