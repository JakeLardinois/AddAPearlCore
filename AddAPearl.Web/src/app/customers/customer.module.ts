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
	PolymerElement,
} from '@vaadin/angular2-polymer';
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
		AddressDialog,
		CustomerListComponent,
		CustomerDialog,
		CustomerFilterPipe,
		PolymerElement('vaadin-date-picker'),
		PolymerElement('vaadin-combo-box'),
	],
	entryComponents: [
		AddressDialog,
		CustomerDialog,
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
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class CustomerModule {}
