import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule} from '@angular/router';

import { CompanyService } from './company.service';
import { CompanyListComponent }  from './company-list.component';
import { AddressDialog }  from './company-list.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot(),
    RouterModule.forChild([
      { path: 'companies', component: CompanyListComponent }
    ])
  ],
  declarations: [
    CompanyListComponent,
    AddressDialog
  ],
  entryComponents: [
    AddressDialog
  ],
  providers: [
    CompanyService
  ]
})
export class CompanyModule {}