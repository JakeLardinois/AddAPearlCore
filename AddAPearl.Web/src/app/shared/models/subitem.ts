import {
  ICustomer,
  IItem,
  IProduct,
} from './index';

/* Defines the Item entity */
export interface ISubItem {
  subItemId: number;
  itemId: number;
  item: IItem;
  productId: number;
  product: IProduct;
  subItemName: string;
  price: number;
  purchasPrice: number;
  purchasDate: string;
  description: string;
  ownerId: number;
  owner: ICustomer;
  customerId: number;
  customer: ICustomer;
  rating: number;
}

export class SubItem implements ISubItem {
  constructor(
    public subItemId: number,
    public itemId: number,
    public item: IItem,
    public productId: number,
    public product: IProduct,
    public subItemName: string,
    public price: number,
    public purchasPrice: number,
    public purchasDate: string,
    public description: string,
    public ownerId: number,
    public owner: ICustomer,
    public customerId: number,
    public customer: ICustomer,
    public rating: number,
  ) {
    // Any other stuff to do during construction...
  }
}
