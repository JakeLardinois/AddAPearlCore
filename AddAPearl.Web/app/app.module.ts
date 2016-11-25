import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { AppComponent }  from './app.component';
import { CompanyListComponent }  from './companies/company-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    CompanyListComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }