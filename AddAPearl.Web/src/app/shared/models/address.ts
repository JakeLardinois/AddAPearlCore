/* Defines the address entity */
export interface IAddress {
	addressId: number;
	addressLine1: string;
	addressLine2: string;
	addressLine3: string;
	city: string;
	state: string;
	zipCode: string;
}

export class Address implements IAddress {
	constructor(
		public addressId: number,
		public addressLine1: string,
		public addressLine2: string,
		public addressLine3: string,
		public city: string,
		public state: string,
		public zipCode: string,
	) {
		// Any other stuff to do during construction...
	}
}
