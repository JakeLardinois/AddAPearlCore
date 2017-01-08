import {
	IAddress,
} from './address';

/* Defines the company entity */
export interface ICompany {
	companyId: number;
	companyName: string;
	addressId: number;
	address: IAddress;
}

export class Company implements ICompany {
	constructor(
		public companyId: number,
		public companyName: string,
		public addressId: number,
		public address: IAddress
	) {
		// Any other stuff to do during construction...
	}
}
