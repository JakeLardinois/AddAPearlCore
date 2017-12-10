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
  MatSelectModule,
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
    MatSelectModule,
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
    MatSelectModule,
  ]
})
export class MaterialModule {}