import {
	MdlModule,
} from '@angular-mdl/core';
import { NgModule } from '@angular/core';
import {
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import {
	JsonpModule,
} from '@angular/http';
import {
	HttpClientModule,
} from '@angular/common/http';
import {
	MaterialModule,
} from './shared/material.module';
import {
	MatHint,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import {
	BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {
	Logger,
} from 'angular2-logger/core';
import {
	CustomFormsModule,
} from 'ng2-validation';

import 'hammerjs';

import { AppComponent } from './app.component';
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
  declarations: [
    AppComponent,
    AddressDialog,
		WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
		CompanyModule,
		CustomerModule,
		FormsModule,
		HttpClientModule,
    JsonpModule,
    MdlModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
		Logger,
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
