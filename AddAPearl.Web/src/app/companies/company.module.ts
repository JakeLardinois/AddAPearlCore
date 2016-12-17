import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';

import { AddressDialog, StarComponent }  from '../shared/index';
import { CompanyService } from '../shared/services/company.service';
import { CompanyFilterPipe } from './company-filter.pipe';
import { CompanyListComponent }  from './company-list.component';

@NgModule({
  declarations: [
    CompanyListComponent,
    AddressDialog,
    CompanyFilterPipe,
    StarComponent,
  ],
  entryComponents: [
    AddressDialog,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot(),
    RouterModule.forChild([
      { path: 'companies', component: CompanyListComponent },
    ]),
  ],
  providers: [
    CompanyService,
  ],
})

export class CompanyModule {}
