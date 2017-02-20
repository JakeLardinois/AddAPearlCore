import {
	IAddress,
} from './index';

/* Defines the company entity */
export interface ICompany {
	companyId: number;
	companyName: string;
	email: string;
	addressId: number;
	address: IAddress;
}

export class Company implements ICompany {
	constructor(
		public companyId: number,
		public companyName: string,
		public email: string,
		public addressId: number,
		public address: IAddress,
	) {
		// Any other stuff to do during construction...
	};
}
