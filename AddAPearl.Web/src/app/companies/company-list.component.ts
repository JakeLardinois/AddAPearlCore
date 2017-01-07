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
	Address,
	AddressDialog,
	AddressService,
	CompanyService,
	IAddress,
	ICompany,
} from '../shared/index';

import jsonpatch = require('fastJsonPatch/json-patch-duplex.min');

@Component({
	moduleId: module.id,
	selector: 'pearl-companies',
	styleUrls: ['company-list.component.css'],
	templateUrl: 'company-list.component.html',
})

export class CompanyListComponent {
	public pageTitle: string = 'Company List';
	public errorMessage: string;
	public dialogRef: MdDialogRef < AddressDialog > ;
	public listFilter: string = null;
	public companies: ICompany[];
	public observer: any;
	public selectedCompany: ICompany;

	public constructor(private addressService: AddressService, private companyService: CompanyService, public dialog: MdDialog, public snackBar: MdSnackBar) {

	}

	public clicked(company: ICompany): void {
		this.selectedCompany = company;
		if (this.selectedCompany.address === null) {
			this.selectedCompany.address = {
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

	public onRatingClicked(message: string): void {
		let config = new MdSnackBarConfig();
		config.duration = 5000;
		this.snackBar.open(message, 'Dismiss', config);
		this.pageTitle = 'Product List: ' + message;
	}

	protected ngOnInit(): void {
		this.companyService.getCompanies()
			.subscribe((companies) => this.companies = companies,
				(error) => this.errorMessage = < any > error);
	}

	private openAddressDialog(): void {
		this.dialogRef = this.dialog.open(AddressDialog, {
			disableClose: false,
		});
		this.dialogRef.componentInstance.addressName = this.selectedCompany.companyName;
		this.dialogRef.componentInstance.address = this.selectedCompany.address;

		this.dialogRef.afterClosed().subscribe((returnedAddress) => {
			this.observer = jsonpatch.observe(this.selectedCompany);
			this.selectedCompany.addressId = returnedAddress.addressId;
			let patches = jsonpatch.generate(this.observer); // generate patches for if the address Id changed

			this.selectedCompany.address.addressId = returnedAddress.addressId; // since the Id isn't bound to the DOM, it stays null for newly created addresses
			this.companyService.patchCompany(this.selectedCompany, patches)
				.subscribe((company) => this.selectedCompany = company,
					(error) => this.errorMessage = < any > error);
			console.log('result: ' + returnedAddress);
			this.dialogRef = null;
		});
	}
}
