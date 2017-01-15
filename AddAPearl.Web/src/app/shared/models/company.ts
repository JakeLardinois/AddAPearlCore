import {
	IAddress,
} from './index';

/* Defines the company entity */
export interface ICompany {
	companyId: number;
	companyName: string;
	companyEmailAddress: string;
	addressId: number;
	address: IAddress;
}

export class Company implements ICompany {
	constructor(
		public companyId: number,
		public companyName: string,
		public companyEmailAddress: string,
		public addressId: number,
		public address: IAddress,
	) {
		// Any other stuff to do during construction...
	}
}
