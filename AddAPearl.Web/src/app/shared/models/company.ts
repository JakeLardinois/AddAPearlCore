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
