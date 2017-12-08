import {
	ICustomer,
	IProduct,
	ISubItem,
} from './index';

/* Defines the Item entity */
export interface IItem {
	itemId: number;
	productId: number;
	product: IProduct;
	itemName: string;
	price: number;
	purchasPrice: number;
	purchasDate: string;
	description: string;
	ownerId: number;
	owner: ICustomer;
	customerId: number;
	customer: ICustomer;
	subItems: ISubItem[];
	rating: number;
}

export class Item implements IItem {
	constructor(
		public itemId: number,
		public productId: number,
		public product: IProduct,
		public itemName: string,
		public price: number,
		public purchasPrice: number,
		public purchasDate: string,
		public description: string,
		public ownerId: number,
		public owner: ICustomer,
		public customerId: number,
		public customer: ICustomer,
		public subItems: ISubItem[],
		public rating: number,
	) {
		// Any other stuff to do during construction...
	}
}
