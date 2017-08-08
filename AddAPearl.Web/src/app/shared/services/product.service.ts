import {
	Injectable,
} from '@angular/core';
import {
	Headers,
	Http,
	RequestOptions,
	Response,
} from '@angular/http';
import {
	Logger,
} from 'angular2-logger/core';
// Add the RxJS Observable operators.
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {
	Observable,
} from 'rxjs/Rx';

import {
	IProduct,
} from '../index';

@Injectable()
export class ProductService {
	private productsUrl = 'http://localhost:19750/api/products'; // URL to web API
	constructor(
		private http: Http,
		private logger: Logger,
	) {
		// constructor code...
	}
	public getProducts(): Observable < IProduct[] > {
		return this.http.get(this.productsUrl)
			.map((response: Response) => response.json() as IProduct[])
			.do((data) => this.logger.debug('Returned getProducts: ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	public createProduct(product: IProduct) {
		delete product.productId; // Need to remove null key property or else the API ModelBinder Fails
		let payload = product;
		let bodyString = JSON.stringify(payload); // Stringify payload
		let myheaders = new Headers({
			'Content-Type': 'application/json',
		}); // ... Set content type to JSON
		let options = new RequestOptions({
			headers: myheaders,
		}); // Create a request option
		return this.http.post(`${this.productsUrl}/product`, bodyString, options)
			.map((response: Response) => response.json() as IProduct)
			.toPromise()
			.catch((err: any) => {
				this.logger.error('Product Service createProduct Error: ' + err);
				return Promise.reject(err);
			});
	}

	public patchProduct(product: IProduct, patchcommands: any): Observable < IProduct > {
		let bodyString = JSON.stringify(patchcommands); // Stringify payload
		let myheaders = new Headers({
			'Content-Type': 'application/json',
		}); // ... Set content type to JSON
		let options = new RequestOptions({
			headers: myheaders,
		}); // Create a request option
		return this.http.patch(`${this.productsUrl}/product/${product.productId}`, bodyString, options)
			.map((response: Response) => response.json() as IProduct)
			.do((data) => this.logger.debug('Returned patchProduct: ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	public deleteProduct(product: IProduct) {
		let myheaders = new Headers({
			'Content-Type': 'application/json',
		}); // ... Set content type to JSON
		let options = new RequestOptions({
			headers: myheaders,
		}); // Create a request option
		return this.http.delete(`${this.productsUrl}/product/${product.productId}`, options)
			.map((response: Response) => response.json() as IProduct)
			.toPromise()
			.catch((err: any) => {
				this.logger.error('Product Service deleteProduct Error: ' + err);
				return Promise.reject(err);
			});
	}

	private handleError(error: Response | any) {
		// In a real world app, we might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		this.logger.error('Product Service Error: ' + errMsg);
		return Observable.throw(error);
	}
}
