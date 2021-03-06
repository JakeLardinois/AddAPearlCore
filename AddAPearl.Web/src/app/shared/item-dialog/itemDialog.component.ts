import {
  Component,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MatSnackBar,
  MatSnackBarConfig,
} from '@angular/material';
import {
  Logger,
} from 'angular2-logger/core';
import {
  CustomValidators,
} from 'ng2-validation';

import {
  ICustomer,
  IItem,
} from '../index';
import {
  ItemService,
} from '../services/item.service';

import * as jsonpatch from 'fast-json-patch';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'item-dialog',
  styleUrls: ['itemDialog.component.scss'],
  templateUrl: 'itemDialog.component.html',
})

export class ItemDialog {
  public customer: ICustomer;
  public items: IItem[];
  public observer: any;
  public apiValidationErrors: any;
  private snackBarConfig = new MatSnackBarConfig();

  public constructor(
    public dialogRef: MatDialogRef < ItemDialog > ,
    public snackBar: MatSnackBar,
    public itemService: ItemService,
    private logger: Logger,
  ) {
    this.apiValidationErrors = {};
  }

  protected ngOnInit(): void {
    this.snackBarConfig.duration = 5000;
    this.itemService.getItemsByOwnerId(this.customer.customerId)
      .subscribe((items) => {
          this.items = items;
        },
        (error) => this.logger.error(error));
  }

  private handleError(error: any): void {
    const messageBody = JSON.parse(error._body);

    if (messageBody) { // Validation errors were passed back from the API
      this.logger.error('API Validation Errors. Status: ' + error.statusText);
      this.apiValidationErrors = messageBody;
    } else {
      this.logger.error(error);
    }
  }
}
