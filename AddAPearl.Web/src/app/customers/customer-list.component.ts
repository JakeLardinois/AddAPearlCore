import {
	Component,
} from '@angular/core';
import {
	MdDialog,
	MdDialogRef,
	MdSnackBar,
	MdSnackBarConfig,
} from '@angular/material';

import {
	Logger,
} from 'angular2-logger/core';

import {
	MdlDialogService,
} from 'angular2-mdl';

import {
	Address,
	AddressDialog,
	AddressService,
	CustomerDialog,
	CustomerService,
	IAddress,
	ICustomer,
} from '../shared/index';

import * as jsonpatch from 'fast-json-patch';
import * as _ from 'lodash';

@Component({
	moduleId: module.id,
	selector: 'pearl-customers',
	styleUrls: ['customer-list.component.css'],
	templateUrl: 'customer-list.component.html',
})

export class CustomerListComponent {
	public pageTitle: string = 'Customer List';
	public dialogRef: MdDialogRef < any > ;
	public listFilter: string = null;
	public customers: ICustomer[];
	public observer: any;
	public selectedCustomer: ICustomer;
	private snackBarConfig = new MdSnackBarConfig();

	public constructor(
		private dialogService: MdlDialogService,
		private addressService: AddressService,
		private customerService: CustomerService,
		public dialog: MdDialog,
		public snackBar: MdSnackBar,
		private logger: Logger,
	) {
		// constructor code...
		logger.level = 5;
	}

	public addCustomer(): void {
		this.dialogRef = this.dialog.open(CustomerDialog, {
			disableClose: false,
		});

		this.selectedCustomer = {
			address: null,
			addressId: null,
			birthDay: null,
			company: null,
			companyId: null,
			customerId: null,
			email: null,
			firstName: null,
			lastName: null,
			phoneNumber: null,
		};
		this.dialogRef.componentInstance.customer = this.selectedCustomer;

		this.dialogRef.afterClosed().subscribe((returnedCustomer) => {
			this.logger.debug('result: ' + JSON.stringify(returnedCustomer));
			this.customers.push(returnedCustomer);
			this.dialogRef = null;
		});
	}

	public editCustomerAddress(customer: ICustomer): void {
		this.selectedCustomer = customer;
		if (this.selectedCustomer.address === null) {
			this.selectedCustomer.address = {
				addressId: null,
				addressLine1: null,
				addressLine2: null,
				addressLine3: null,
				city: null,
				state: null,
				zipCode: null,
			};
			this.openAddressDialog();
		} else {
			this.openAddressDialog();
		}
	}

	public editCustomer(customer: ICustomer): void {
		this.selectedCustomer = customer;
		this.dialogRef = this.dialog.open(CustomerDialog, {
			disableClose: false,
		});
		this.dialogRef.componentInstance.customer = _.cloneDeep(this.selectedCustomer);

		this.dialogRef.afterClosed().subscribe((returnedCustomer) => {
			if (returnedCustomer) {
				this.logger.debug('result: ' + JSON.stringify(returnedCustomer));
				let index = this.customers.indexOf(this.selectedCustomer);
				this.selectedCustomer = returnedCustomer;
				this.customers[index] = this.selectedCustomer;
				this.dialogRef = null;
			} else {
				this.logger.debug('Customer Edit Cancelled');
				this.dialogRef = null;
			}
		});
	}

	public deleteCustomer(customer: ICustomer): void {
		let result = this.dialogService.confirm(`Are you sure you want to delete ${customer.firstName} ${customer.lastName}?`, 'No', 'Yes');
		result.subscribe(() => {
				this.logger.debug('confirmed');
				this.customerService.deleteCustomer(customer).then((deletedCustomer) => {
						let index = this.customers.indexOf(customer);
						this.customers.splice(index, 1);
						this.snackBar.open(`Customer ${customer.firstName} ${customer.lastName} was deleted`, 'Ok', this.snackBarConfig);
					})
					.catch((error) => {
						this.snackBar.open(`Failed to delete ${customer.firstName} ${customer.lastName}: ${error}`, 'Ok', this.snackBarConfig);
						this.logger.error(error);
					});
			},
			(err: any) => {
				this.logger.debug('declined: ' + err);
			});
	}

	protected ngOnInit(): void {
		this.logger.debug('lodash version:' + _.VERSION);
		this.snackBarConfig.duration = 5000;

		this.customerService.getCustomers()
			.subscribe((customers) => this.customers = customers,
				(error) => this.logger.error(error));
	}

	private openAddressDialog(): void {
		this.dialogRef = this.dialog.open(AddressDialog, {
			disableClose: false,
		});
		this.dialogRef.componentInstance.addressName = this.selectedCustomer.firstName + ' ' + this.selectedCustomer.lastName;
		this.dialogRef.componentInstance.address = _.cloneDeep(this.selectedCustomer.address);

		this.dialogRef.afterClosed().subscribe((returnedAddress) => {
			if (returnedAddress) {
				this.logger.debug('result: ' + JSON.stringify(returnedAddress));
				this.selectedCustomer.address = null; // otherwise patches will get generated for previous address changes
				this.observer = jsonpatch.observe(this.selectedCustomer);
				this.selectedCustomer.addressId = returnedAddress.addressId;
				let patches = jsonpatch.generate(this.observer); // generate patches for if the address Id changed

				if (patches.length > 0) {
					this.customerService.patchCustomer(this.selectedCustomer, patches)
					.subscribe((customer) => {
						let index = this.customers.indexOf(this.selectedCustomer);
						this.selectedCustomer = customer;
						this.customers[index] = this.selectedCustomer;
						this.dialogRef = null;
					}, (error) => this.logger.error(error));
				} else {
					this.selectedCustomer.address = returnedAddress;
					this.dialogRef = null;
				}
			} else {
				this.logger.debug('Customer Address Edit Cancelled');
				this.dialogRef = null;
			}
		});
	}
}
