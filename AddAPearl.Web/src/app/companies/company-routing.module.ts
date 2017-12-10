import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CompanyListComponent
} from './company-list.component';

const routes: Routes = [{
    component: CompanyListComponent,
    path: 'companies',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {}
