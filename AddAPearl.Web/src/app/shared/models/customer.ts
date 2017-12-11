import {
  IAddress,
  ICompany,
} from './index';

/* Defines the customer entity */
export interface ICustomer {
  customerId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDay: string;
  email: string;
  addressId: number;
  address: IAddress;
  companyId: number;
  company: ICompany;
}

export class Customer implements ICustomer {
  constructor(
    public customerId: number,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public birthDay: string,
    public email: string,
    public addressId: number,
    public address: IAddress,
    public companyId: number,
    public company: ICompany,
  ) {
    // Any other stuff to do during construction...
  }
}
