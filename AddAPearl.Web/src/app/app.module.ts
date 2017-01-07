import {
	NgModule,
} from '@angular/core';
import {
	FormsModule,
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
	RouterModule,
} from '@angular/router';
import 'hammerjs';

import {
	AppComponent,
} from './app.component';
import {
	WelcomeComponent,
} from './home/welcome.component';

/* Feature Modules */
import {
	CompanyModule,
} from './companies/company.module';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		WelcomeComponent,
	],
	imports: [
		BrowserModule,
		CompanyModule,
		FormsModule,
		HttpModule,
		JsonpModule,
		MaterialModule.forRoot(),
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
})
export class AppModule {}
