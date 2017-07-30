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
		RouterModule.forChild([{
			component: CompanyListComponent,
			path: 'companies',
		}]),
	],
	providers: [
		AddressService,
		CompanyService,
	],
})

export class CompanyModule {}
