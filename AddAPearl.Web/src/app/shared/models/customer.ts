/* Defines the customer entity */
export interface ICustomer {
	customerId: number;
	firstName: string;
	LastName: string;
	phoneNumber: string;
	email: string;
	addressId: number;
	companyId: number;
}

export class Customer implements ICustomer {
	constructor(
		public customerId: number,
        public firstName: string,
        public LastName: string,
        public phoneNumber: string,
        public email: string,
        public addressId: number,
        public companyId: number,
	) {
		// Any other stuff to do during construction...
	}
}
