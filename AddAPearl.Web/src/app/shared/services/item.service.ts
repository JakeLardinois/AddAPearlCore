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
	IItem,
} from '../index';
import { Config } from '../../../config';

@Injectable()
export class ItemService {
	private itemsUrl = Config.webApiUrl + '/items'; // URL to web API
	constructor(
		private http: Http,
		private logger: Logger,
	) {
		// constructor code...
	}
	public getItems(): Observable < IItem[] > {
		return this.http.get(this.itemsUrl)
			.map((response: Response) => response.json() as IItem[])
			.do((data) => this.logger.debug('Item Service Returned getItems: ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	public getItemsByOwnerId(ownerId: number): Observable < IItem[] > {
		return this.http.get(`${this.itemsUrl}/owner/${ownerId}`)
			.map((response: Response) => response.json() as IItem[])
			.do((data) => this.logger.debug('Item Service Returned getItemsByOwnerId: ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	public createItem(item: IItem) {
		delete item.itemId; // Need to remove null key property or else the API ModelBinder Fails
		let payload = item;
		let bodyString = JSON.stringify(payload); // Stringify payload
		let myheaders = new Headers({
			'Content-Type': 'application/json',
		}); // ... Set content type to JSON
		let options = new RequestOptions({
			headers: myheaders,
		}); // Create a request option
		return this.http.post(`${this.itemsUrl}/item`, bodyString, options)
			.map((response: Response) => response.json() as IItem)
			.toPromise()
			.catch((err: any) => {
				this.logger.error('Item Service createItem Error: ' + err);
				return Promise.reject(err);
			});
	}

	public patchItem(item: IItem, patchcommands: any): Observable < IItem > {
		let bodyString = JSON.stringify(patchcommands); // Stringify payload
		let myheaders = new Headers({
			'Content-Type': 'application/json',
		}); // ... Set content type to JSON
		let options = new RequestOptions({
			headers: myheaders,
		}); // Create a request option
		return this.http.patch(`${this.itemsUrl}/item/${item.itemId}`, bodyString, options)
			.map((response: Response) => response.json() as IItem)
			.do((data) => this.logger.debug('Returned patchItem: ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	public deleteItem(item: IItem) {
		let myheaders = new Headers({
			'Content-Type': 'application/json',
		}); // ... Set content type to JSON
		let options = new RequestOptions({
			headers: myheaders,
		}); // Create a request option
		return this.http.delete(`${this.itemsUrl}/item/${item.itemId}`, options)
			.map((response: Response) => response.json() as IItem)
			.toPromise()
			.catch((err: any) => {
				this.logger.error('Item Service deleteItem Error: ' + err);
				return Promise.reject(err);
			});
	}

	private handleError(error: Response | any) {

		if (error.status === 404) {
			//return Observable.throw('Unauthorized');
			//return Observable.empty;
			return Observable.throw(error);
		}
		// In a real world app, we might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		this.logger.error('Item Service Error: ' + errMsg);
		return Observable.throw(error);
	}
}
