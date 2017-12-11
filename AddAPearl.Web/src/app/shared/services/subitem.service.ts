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
	ISubItem,
} from '../index';
import { Config } from '../../../config';

@Injectable()
export class SubItemService {
	private subItemsUrl = Config.webApiUrl + '/subItems'; // URL to web API
	constructor(
		private http: HttpClient,
	) {
		// constructor code...
	}
	public getSubItems(): Observable < ISubItem[] > {
		return this.http.get<ISubItem[]>(this.subItemsUrl);
	}

	public createSubItem(subItem: ISubItem) {
		delete subItem.subItemId; // Need to remove null key property or else the API ModelBinder Fails
		let payload = subItem;
		let bodyString = JSON.stringify(payload); // Stringify payload
		let headers = new HttpHeaders()
			.set("Content-Type", "application/json");
		return this.http.post<ISubItem>(`${this.subItemsUrl}/subItem`, bodyString, {headers});
	}

	public patchSubItem(subItem: ISubItem, patchcommands: any): Observable < ISubItem > {
		let bodyString = JSON.stringify(patchcommands); // Stringify payload
		let headers = new HttpHeaders()
			.set("Content-Type", "application/json");
		return this.http.patch<ISubItem>(`${this.subItemsUrl}/subItem/${subItem.subItemId}`, bodyString, {headers});
	}

	public deleteSubItem(subItem: ISubItem) {
		let headers = new HttpHeaders()
			.set("Content-Type", "application/json");
	}
}
