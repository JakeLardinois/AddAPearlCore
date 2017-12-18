import {
  Component
} from '@angular/core';
import {
  MatDialogRef,
  MatDialogConfig,
  MatDialog
} from '@angular/material';
import {
  ItemDialog
} from '.';

@Component({
  selector: 'dialog-component',
  template: `Comment Out First Provider object to see actual Item Dialog Content...`
})
export class TestComponent {
  viewContainerRef: any;
  public dialogRef: MatDialogRef < any > ;
  constructor(public dialog: MatDialog) {}

  upgrade() {
    if (!this.dialogRef) {
      let config = new MatDialogConfig();
      config.viewContainerRef = this.viewContainerRef;
      this.dialogRef = this.dialog.open(ItemDialog, config);
      this.dialogRef.afterClosed().subscribe(
        result => this.dialogRef = null
      );
    }
  }
}
