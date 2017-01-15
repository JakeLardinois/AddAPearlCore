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
	ICustomer,
} from '../index';

@Injectable()
export class CustomerService {
	private customersUrl = 'http://localhost:19750/api/customers'; // URL to web API
	constructor(
		private http: Http,
		private logger: Logger,
	) {
		// constructor code...
	}
	public getcustomers(): Observable < ICustomer[] > {
		return this.http.get(this.customersUrl)
			.map((response: Response) => < ICustomer[] > response.json())
			.do((data) => this.logger.debug('Returned getCustomers: ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	public createCustomer(customer: ICustomer) {
		delete customer.customerId; // Need to remove null key property or else the API ModelBinder Fails
		let payload = customer;
		let bodyString = JSON.stringify(payload); // Stringify payload
		let myheaders = new Headers({
			'Content-Type': 'application/json',
		}); // ... Set content type to JSON
		let options = new RequestOptions({
			headers: myheaders,
		}); // Create a request option
		return this.http.post(`${this.customersUrl}/customer`, bodyString, options)
			.map((response: Response) => < ICustomer > response.json())
			.toPromise()
			.catch((err: any) => {
				this.logger.error('Customer Service createCustomer Error: ' + err);
				return Promise.reject(err);
			});
	}

	public patchCustomer(customer: ICustomer, patchcommands: any): Observable < ICustomer > {
		let bodyString = JSON.stringify(patchcommands); // Stringify payload
		let myheaders = new Headers({
			'Content-Type': 'application/json',
		}); // ... Set content type to JSON
		let options = new RequestOptions({
			headers: myheaders,
		}); // Create a request option
		return this.http.patch(`${this.customersUrl}/customer/${customer.customerId}`, bodyString, options)
			.map((response: Response) => < ICustomer > response.json())
			.do((data) => this.logger.debug('Returned patchCustomer: ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	public deleteCustomer(customer: ICustomer) {
		let myheaders = new Headers({
			'Content-Type': 'application/json',
		}); // ... Set content type to JSON
		let options = new RequestOptions({
			headers: myheaders,
		}); // Create a request option
		return this.http.delete(`${this.customersUrl}/customer/${customer.customerId}`, options)
			.map((response: Response) => < ICustomer > response.json())
			.toPromise()
			.catch((err: any) => {
				this.logger.error('Customer Service deleteCustomer Error: ' + err);
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
		this.logger.error('Customer Service Error: ' + errMsg);
		return Observable.throw(error);
	}
}
