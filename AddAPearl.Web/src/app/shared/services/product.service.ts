import {
	Injectable,
} from '@angular/core';
import {
	HttpClient,
	HttpHeaders,
	HttpResponse
} from '@angular/common/http';
import {
	Observable,
} from 'rxjs/Rx';

import {
	IProduct,
} from '../index';
import { Config } from '../../../config';

@Injectable()
export class ProductService {
	private productsUrl = Config.webApiUrl + '/products'; // URL to web API
	constructor(
		private http: HttpClient,
	) {
		// constructor code...
	}
	public getProducts(): Observable < IProduct[] > {
		return this.http.get<IProduct[]>(this.productsUrl);
	}

	public createProduct(product: IProduct) {
		delete product.productId; // Need to remove null key property or else the API ModelBinder Fails
		let payload = product;
		let bodyString = JSON.stringify(payload); // Stringify payload
		let headers = new HttpHeaders()
			.set("Content-Type", "application/json");
		return this.http.post(`${this.productsUrl}/product`, bodyString, {headers});
	}

	public patchProduct(product: IProduct, patchcommands: any): Observable < IProduct > {
		let bodyString = JSON.stringify(patchcommands); // Stringify payload
		let headers = new HttpHeaders()
			.set("Content-Type", "application/json");
		return this.http.patch<IProduct>(`${this.productsUrl}/product/${product.productId}`, bodyString, {headers});
	}

	public deleteProduct(product: IProduct) {
		let headers = new HttpHeaders()
			.set("Content-Type", "application/json");
		return this.http.delete<IProduct>(`${this.productsUrl}/product/${product.productId}`, {headers});
			});
	}
}
