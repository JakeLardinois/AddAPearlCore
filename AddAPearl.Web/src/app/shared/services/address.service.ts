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
	IAddress,
} from '../index';
import { Config } from '../../../config';

@Injectable()
export class AddressService {
	private addressesUrl = Config.webApiUrl + '/addresses'; // URL to web API
	constructor(
		private http: HttpClient,
	) {

	}
	public createAddress(address: IAddress) {
		delete address.addressId; // Need to remove null key property or else the API ModelBinder Fails
		let payload = address;
		let bodyString = JSON.stringify(payload); // Stringify payload
		let headers = new HttpHeaders()
			.set("Content-Type", "application/json");
		return this.http.post<IAddress>(`${this.addressesUrl}/address`, bodyString, {headers});
	}

	public patchAddress(address: IAddress, patchcommands: any): Observable < IAddress > {
		let bodyString = JSON.stringify(patchcommands); // Stringify payload
		let headers = new HttpHeaders()
			.set("Content-Type", "application/json");
		return this.http.patch<IAddress>(`${this.addressesUrl}/address/${address.addressId}`, bodyString, {headers});
	}
}
