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
	IItem,
} from '../index';
import { Config } from '../../../config';

@Injectable()
export class ItemService {
	private itemsUrl = Config.webApiUrl + '/items'; // URL to web API
	constructor(
		private http: HttpClient,
	) {
		// constructor code...
	}
	public getItems(): Observable < IItem[] > {
		return this.http.get<IItem[]>(this.itemsUrl);
	}

	public getItemsByOwnerId(ownerId: number): Observable < IItem[] > {
		return this.http.get<IItem[]>(`${this.itemsUrl}/owner/${ownerId}`);
	}

	public createItem(item: IItem) {
		delete item.itemId; // Need to remove null key property or else the API ModelBinder Fails
		let payload = item;
		let bodyString = JSON.stringify(payload); // Stringify payload
		let headers = new HttpHeaders()
			.set("Content-Type", "application/json");
		return this.http.post<IItem>(`${this.itemsUrl}/item`, bodyString, {headers});
	}

	public patchItem(item: IItem, patchcommands: any): Observable < IItem > {
		let bodyString = JSON.stringify(patchcommands); // Stringify payload
		let headers = new HttpHeaders()
			.set("Content-Type", "application/json");
		return this.http.patch<IItem>(`${this.itemsUrl}/item/${item.itemId}`, bodyString, {headers});
	}

	public deleteItem(item: IItem) {
		let headers = new HttpHeaders()
			.set("Content-Type", "application/json");
		return this.http.delete<IItem>(`${this.itemsUrl}/item/${item.itemId}`, {headers});
	}
}
