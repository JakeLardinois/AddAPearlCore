import {
	NgModule,
} from '@angular/core';
import {
	FormsModule,
} from '@angular/forms';
import {
	MaterialModule,
} from '@angular/material';
import { MdlModule } from 'angular2-mdl';
import {
	BrowserModule,
} from '@angular/platform-browser';
import {
	RouterModule,
} from '@angular/router';

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
		AddressDialog,
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
		FormsModule,
		MaterialModule.forRoot(),
		MdlModule,
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
