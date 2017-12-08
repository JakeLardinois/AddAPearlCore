import {
	IAddress,
	ICompany,
} from './index';

/* Defines the product entity */
export interface IProduct {
	productId: number;
	productName: string;
	productCode: string;
	releaseDate: string;
	price: number;
	purchasePrice: number;
	purchaseDate: string;
	description: string;
	rating: number;
}

export class Product implements IProduct {
	constructor(
		public productId: number,
		public productName: string,
		public productCode: string,
		public releaseDate: string,
		public price: number,
		public purchasePrice: number,
		public purchaseDate: string,
		public description: string,
		public rating: number,
	) {
		// Any other stuff to do during construction...
	}
}
