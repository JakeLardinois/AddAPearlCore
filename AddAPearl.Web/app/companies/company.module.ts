import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule} from '@angular/router';

import { CompanyService } from '../shared/services/company.service';
import { CompanyListComponent }  from './company-list.component';
import { CompanyFilterPipe } from './company-filter.pipe';
import { AddressDialog }  from './company-list.component';
import { StarComponent } from '../shared/star.component';


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
    AddressDialog,
    CompanyFilterPipe,
    StarComponent
  ],
  entryComponents: [
    AddressDialog
  ],
  providers: [
    CompanyService
  ]
})
export class CompanyModule {}