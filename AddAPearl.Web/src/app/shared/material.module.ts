import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatNativeDateModule,
  MatInputModule,
  MatDatepickerModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
  ]
})
export class MaterialModule {}