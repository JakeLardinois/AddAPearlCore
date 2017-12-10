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
  MatSnackBarModule,
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
    MatSnackBarModule,
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
    MatSnackBarModule,
  ]
})
export class MaterialModule {}