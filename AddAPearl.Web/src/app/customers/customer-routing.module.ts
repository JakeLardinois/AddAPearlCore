import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CustomerListComponent
} from './customer-list.component';

const routes: Routes = [{
    component: CustomerListComponent,
    path: 'customers',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}
