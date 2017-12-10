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
	ISubItem,
} from '../index';
import { Config } from '../../../config';

@Injectable()
export class SubItemService {
	private subItemsUrl = Config.webApiUrl + '/subItems'; // URL to web API
	constructor(
		private http: Http,
		private logger: Logger,
	) {
		// constructor code...
	}
	public getSubItems(): Observable < ISubItem[] > {
		return this.http.get(this.subItemsUrl)
			.map((response: Response) => response.json() as ISubItem[])
			.do((data) => this.logger.debug('Returned getSubItems: ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	public createSubItem(subItem: ISubItem) {
		delete subItem.subItemId; // Need to remove null key property or else the API ModelBinder Fails
		let payload = subItem;
		let bodyString = JSON.stringify(payload); // Stringify payload
		let myheaders = new Headers({
			'Content-Type': 'application/json',
		}); // ... Set content type to JSON
		let options = new RequestOptions({
			headers: myheaders,
		}); // Create a request option
		return this.http.post(`${this.subItemsUrl}/subItem`, bodyString, options)
			.map((response: Response) => response.json() as ISubItem)
			.toPromise()
			.catch((err: any) => {
				this.logger.error('SubItem Service createSubItem Error: ' + err);
				return Promise.reject(err);
			});
	}

	public patchSubItem(subItem: ISubItem, patchcommands: any): Observable < ISubItem > {
		let bodyString = JSON.stringify(patchcommands); // Stringify payload
		let myheaders = new Headers({
			'Content-Type': 'application/json',
		}); // ... Set content type to JSON
		let options = new RequestOptions({
			headers: myheaders,
		}); // Create a request option
		return this.http.patch(`${this.subItemsUrl}/subItem/${subItem.subItemId}`, bodyString, options)
			.map((response: Response) => response.json() as ISubItem)
			.do((data) => this.logger.debug('Returned patchSubItem: ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	public deleteSubItem(subItem: ISubItem) {
		let myheaders = new Headers({
			'Content-Type': 'application/json',
		}); // ... Set content type to JSON
		let options = new RequestOptions({
			headers: myheaders,
		}); // Create a request option
		return this.http.delete(`${this.subItemsUrl}/subItem/${subItem.subItemId}`, options)
			.map((response: Response) => response.json() as ISubItem)
			.toPromise()
			.catch((err: any) => {
				this.logger.error('SubItem Service deleteSubItem Error: ' + err);
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
		this.logger.error('SubItem Service Error: ' + errMsg);
		return Observable.throw(error);
	}
}
