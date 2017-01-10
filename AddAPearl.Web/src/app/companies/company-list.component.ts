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
	MdlDialogService,
} from 'angular2-mdl';

import {
	Address,
	AddressDialog,
	AddressService,
	CompanyDialog,
	CompanyService,
	IAddress,
	ICompany,
} from '../shared/index';

import * as jsonpatch from 'fast-json-patch';
import * as _ from 'lodash';

@Component({
	moduleId: module.id,
	selector: 'pearl-companies',
	styleUrls: ['company-list.component.css'],
	templateUrl: 'company-list.component.html',
})

export class CompanyListComponent {
	public pageTitle: string = 'Company List';
	public errorMessage: string;
	public dialogRef: MdDialogRef < any > ;
	public listFilter: string = null;
	public companies: ICompany[];
	public observer: any;
	public selectedCompany: ICompany;
	private snackBarConfig = new MdSnackBarConfig();

	public constructor(
		private dialogService: MdlDialogService,
		private addressService: AddressService,
		private companyService: CompanyService,
		public dialog: MdDialog,
		public snackBar: MdSnackBar,
	) {
		// constructor code...
	}

	public addCompany(): void {
		this.dialogRef = this.dialog.open(CompanyDialog, {
			disableClose: false,
		});

		this.selectedCompany = {
			address: null,
			addressId: null,
			companyEmailAddress: null,
			companyId: null,
			companyName: null,
		};
		this.dialogRef.componentInstance.company = this.selectedCompany;

		this.dialogRef.afterClosed().subscribe((returnedCompany) => {
			console.log('result: ' + returnedCompany);
			this.companies.push(returnedCompany);
			this.dialogRef = null;
		});
	}

	public editCompanyAddress(company: ICompany): void {
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

	public editCompany(company: ICompany): void {
		this.selectedCompany = company;
		this.dialogRef = this.dialog.open(CompanyDialog, {
			disableClose: false,
		});
		this.dialogRef.componentInstance.company = this.selectedCompany;

		this.dialogRef.afterClosed().subscribe((returnedCompany) => {
			console.log('result: ' + returnedCompany);
			this.dialogRef = null;
		});
	}

	public deleteCompany(company: ICompany): void {
		let result = this.dialogService.confirm(`Are you sure you want to delete ${company.companyName}?`, 'No', 'Yes');
		result.subscribe( () => {
			// console.log('confirmed');
			this.companyService.deleteCompany(company).then((deletedCompany) => {
				let index = this.companies.indexOf(company);
				this.companies.splice(index, 1);
				this.snackBar.open(`Company ${company.companyName} was deleted` , 'Ok', this.snackBarConfig);
			})
			.catch((error) => {
				this.snackBar.open(`Failed to delete ${company.companyName}: ${error}`, 'Ok', this.snackBarConfig);
				console.log(error);
			});
		},
		(err: any) => {
			// console.log('declined');
		});
	}

	public onRatingClicked(message: string): void {
		let config = new MdSnackBarConfig();
		config.duration = 5000;
		this.snackBar.open(message, 'Dismiss', config);
		this.pageTitle = 'Product List: ' + message;
	}

	protected ngOnInit(): void {
		this.snackBarConfig.duration = 5000;
		console.log('lodash version:' +  _.VERSION);

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
