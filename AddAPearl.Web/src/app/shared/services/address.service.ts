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
	IAddress,
} from '../index';
import { Config } from '../../../config';

@Injectable()
export class AddressService {
	private addressesUrl = Config.webApiUrl + '/addresses'; // URL to web API
	constructor(
		private http: Http,
		private logger: Logger,
	) {

	}
	public createAddress(address: IAddress) {
		delete address.addressId; // Need to remove null key property or else the API ModelBinder Fails
		let payload = address;
		let bodyString = JSON.stringify(payload); // Stringify payload
		let myheaders = new Headers({
			'Content-Type': 'application/json',
		}); // ... Set content type to JSON
		let options = new RequestOptions({
			headers: myheaders,
		}); // Create a request option
		return this.http.post(`${this.addressesUrl}/address`, bodyString, options)
			.map((response: Response) => response.json() as IAddress)
			.toPromise()
			.catch((err: any) => {
				this.logger.error('Address Service createAddress Error: ' + err);
				return Promise.reject(err);
			});
	}

	public patchAddress(address: IAddress, patchcommands: any): Observable < IAddress > {
		let bodyString = JSON.stringify(patchcommands); // Stringify payload
		let myheaders = new Headers({
			'Content-Type': 'application/json',
		}); // ... Set content type to JSON
		let options = new RequestOptions({
			headers: myheaders,
		}); // Create a request option
		return this.http.patch(`${this.addressesUrl}/address/${address.addressId}`, bodyString, options)
			.map((response: Response) => response.json() as IAddress)
			.do((data) => this.logger.debug('Returned patchAddress: ' + JSON.stringify(data)))
			.catch(this.handleError);
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
		this.logger.error('Address Service Error: ' + errMsg);
		return Observable.throw(error);
	}
}
