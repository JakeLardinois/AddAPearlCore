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
	public dialogRef: MdDialogRef < any > ;
	public listFilter: string = null;
	public companies: ICompany[];
	public observer: any;
	public selectedCompany: ICompany;
	private snackBarConfig = new MdSnackBarConfig();

	public constructor(
		private dialogService: MdlDialogService,
		private companyService: CompanyService,
		public dialog: MdDialog,
		public snackBar: MdSnackBar,
		private logger: Logger,
	) {
		// constructor code...
		logger.level = 5;
	}

	public addCompany(): void {
		this.dialogRef = this.dialog.open(CompanyDialog, {
			disableClose: false,
		});

		this.selectedCompany = {
			address: null,
			addressId: null,
			companyId: null,
			companyName: null,
			email: null,
		};
		this.dialogRef.componentInstance.company = this.selectedCompany;

		this.dialogRef.afterClosed().subscribe((returnedCompany) => {
			this.logger.debug('result: ' + JSON.stringify(returnedCompany));
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

		this.dialogRef.componentInstance.company = _.cloneDeep(this.selectedCompany);

		this.dialogRef.afterClosed().subscribe((returnedCompany) => {
			if (returnedCompany) {
				this.logger.debug('result: ' + JSON.stringify(returnedCompany));
				let index = this.companies.indexOf(this.selectedCompany);
				this.selectedCompany = returnedCompany;
				this.companies[index] = this.selectedCompany;
				this.dialogRef = null;
			} else {
				this.logger.debug('Company Edit Cancelled');
				this.dialogRef = null;
			}
		});
	}

	public deleteCompany(company: ICompany): void {
		let result = this.dialogService.confirm(`Are you sure you want to delete ${company.companyName}?`, 'No', 'Yes');
		result.subscribe( () => {
			this.logger.debug('confirmed');
			this.companyService.deleteCompany(company).then((deletedCompany) => {
				let index = this.companies.indexOf(company);
				this.companies.splice(index, 1);
				this.snackBar.open(`Company ${company.companyName} was deleted` , 'Ok', this.snackBarConfig);
			})
			.catch((error) => {
				this.snackBar.open(`Failed to delete ${company.companyName}: ${error}`, 'Ok', this.snackBarConfig);
				this.logger.error(error);
			});
		},
		(err: any) => {
			this.logger.debug('declined: ' + err);
		});
	}

	public onRatingClicked(message: string): void {
		let config = new MdSnackBarConfig();
		config.duration = 5000;
		this.snackBar.open(message, 'Dismiss', config);
	}

	protected ngOnInit(): void {
		this.logger.debug('lodash version:' +  _.VERSION);
		this.snackBarConfig.duration = 5000;

		this.companyService.getCompanies()
			.subscribe((companies) => this.companies = companies,
				(error) => this.logger.error(error));
	}

	private openAddressDialog(): void {
		this.dialogRef = this.dialog.open(AddressDialog, {
			disableClose: false,
		});
		this.dialogRef.componentInstance.addressName = this.selectedCompany.companyName;
		this.dialogRef.componentInstance.address = _.cloneDeep(this.selectedCompany.address);

		this.dialogRef.afterClosed().subscribe((returnedAddress) => {
			if (returnedAddress) {
				this.logger.debug('result: ' + JSON.stringify(returnedAddress));
				this.selectedCompany.address = null; // otherwise patches will get generated for previous address changes
				this.observer = jsonpatch.observe(this.selectedCompany);
				this.selectedCompany.addressId = returnedAddress.addressId;
				let patches = jsonpatch.generate(this.observer); // generate patches for if the address Id changed

				if (patches.length > 0) {
					this.companyService.patchCompany(this.selectedCompany, patches)
						.subscribe((company) => {
							let index = this.companies.indexOf(this.selectedCompany);
							this.selectedCompany = company;
							this.companies[index] = this.selectedCompany;
							this.dialogRef = null;
						}, (error) => this.logger.error(error));
				} else {
					this.selectedCompany.address = returnedAddress;
					this.dialogRef = null;
				}
			} else {
				this.logger.debug('Company Address Edit Cancelled');
				this.dialogRef = null;
			}

		});
	}
}
