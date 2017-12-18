import {
  Component
} from '@angular/core';
import {
  MatDialogRef,
  MatDialogConfig,
  MatDialog
} from '@angular/material';
import {
  AddressDialog
} from '.';

@Component({
  selector: 'dialog-component',
  template: `Can't resolve all parameters for MdDialogRef: (?)`
})
export class TestComponent {
  viewContainerRef: any;
  public dialogRef: MatDialogRef < any > ;
  constructor(public dialog: MatDialog) {}

  upgrade() {
    if (!this.dialogRef) {
      let config = new MatDialogConfig();
      config.viewContainerRef = this.viewContainerRef;
      this.dialogRef = this.dialog.open(AddressDialog, config);
      this.dialogRef.afterClosed().subscribe(
        result => this.dialogRef = null
      );
    }
  }
}
