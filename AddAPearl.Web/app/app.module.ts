import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';

import { CompanyService } from './companies/company.service';
import { CompanyListComponent }  from './companies/company-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot(),
    HttpModule,
    JsonpModule
  ],
  declarations: [
    AppComponent,
    CompanyListComponent
  ],
  providers: [
    CompanyService
  ],  
  bootstrap: [ AppComponent ]
})
export class AppModule { }