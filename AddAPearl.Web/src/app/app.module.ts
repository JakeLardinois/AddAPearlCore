import {
	NgModule,
} from '@angular/core';
import {
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import {
	HttpModule,
	JsonpModule,
} from '@angular/http';
import {
	MaterialModule,
} from '@angular/material';
import {
	BrowserModule,
} from '@angular/platform-browser';
import {
	BrowserAnimationsModule,
} from "@angular/platform-browser/animations";
import {
	RouterModule,
} from '@angular/router';
import {
	Logger,
} from 'angular2-logger/core';
import {
	MdlModule,
} from '@angular-mdl/core';
import {
	CustomFormsModule,
} from 'ng2-validation';

import 'hammerjs';

import {
	AppComponent,
} from './app.component';
import {
	WelcomeComponent,
} from './home/welcome.component';

import {
	AddressDialog,
} from './shared/index';

/* Feature Modules */
import {
	CompanyModule,
} from './companies/company.module';
import {
	CustomerModule,
} from './customers/customer.module';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AddressDialog,
		AppComponent,
		WelcomeComponent,
	],
	entryComponents: [
		AddressDialog,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CompanyModule,
		CustomerModule,
		FormsModule,
		HttpModule,
		JsonpModule,
		MdlModule,
		ReactiveFormsModule,
		MaterialModule,
		RouterModule.forRoot([{
				component: WelcomeComponent,
				path: 'welcome',
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'welcome',
			},
			{
				path: '**',
				pathMatch: 'full',
				redirectTo: 'welcome',
			},
		]),
	],
	providers: [
		Logger,
	],
})
export class AppModule {}
