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
	ICustomer,
} from '../index';
import { Config } from '../../../config';

@Injectable()
export class CustomerService {
	private customersUrl = Config.webApiUrl + '/customers'; // URL to web API
	constructor(
		private http: HttpClient,
	) {
		// constructor code...
	}
	public getCustomers(): Observable < ICustomer[] > {
		return this.http.get<ICustomer[]>(this.customersUrl);
	}

	public createCustomer(customer: ICustomer) {
		delete customer.customerId; // Need to remove null key property or else the API ModelBinder Fails
		let payload = customer;
		let bodyString = JSON.stringify(payload); // Stringify payload
		let headers = new HttpHeaders()
			.set("Content-Type", "application/json");
		return this.http.post<ICustomer>(`${this.customersUrl}/customer`, bodyString, {headers});
	}

	public patchCustomer(customer: ICustomer, patchcommands: any): Observable < ICustomer > {
		let bodyString = JSON.stringify(patchcommands); // Stringify payload
		let headers = new HttpHeaders()
			.set("Content-Type", "application/json");
		return this.http.patch<ICustomer>(`${this.customersUrl}/customer/${customer.customerId}`, bodyString, {headers});
	}

	public deleteCustomer(customer: ICustomer) {
		let headers = new HttpHeaders()
			.set("Content-Type", "application/json");
		return this.http.delete<ICustomer>(`${this.customersUrl}/customer/${customer.customerId}`, {headers});
	}
}
