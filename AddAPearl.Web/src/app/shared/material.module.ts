import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSnackBar,
  MatSnackBarConfig,
  MatDialog,
  MatDialogRef,
  MatNativeDateModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSnackBar,
    MatSnackBarConfig,
    MatDialog,
    MatDialogRef,
    MatNativeDateModule,
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSnackBar,
    MatSnackBarConfig,
    MatDialog,
    MatDialogRef,
    MatNativeDateModule,
  ]
})
export class MaterialModule {}