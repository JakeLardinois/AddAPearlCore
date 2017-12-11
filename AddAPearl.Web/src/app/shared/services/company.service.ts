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
	ICompany,
} from '../index';
import { Config } from '../../../config';

@Injectable()
export class CompanyService {
	private companiesUrl = Config.webApiUrl + '/companies'; // URL to web API
	constructor(
		private http: HttpClient,
	) {
		// constructor code...
	}
	public getCompanies(): Observable < ICompany[] > {
		return this.http.get<ICompany[]>(this.companiesUrl);
	}

	public createCompany(company: ICompany) {
		delete company.companyId; // Need to remove null key property or else the API ModelBinder Fails
		const payload = company;
		const bodyString = JSON.stringify(payload); // Stringify payload
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json');
		return this.http.post(`${this.companiesUrl}/company`, bodyString, {headers});
	}

	public patchCompany(company: ICompany, patchcommands: any): Observable < ICompany > {
		const bodyString = JSON.stringify(patchcommands); // Stringify payload
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json');
		return this.http.patch<ICompany>(`${this.companiesUrl}/company/${company.companyId}`, bodyString, {headers});
	}

	public deleteCompany(company: ICompany) {
		const headers = new HttpHeaders()
			.set('Content-Type', 'application/json');
		return this.http.delete<ICompany>(`${this.companiesUrl}/company/${company.companyId}`, {headers});
	}
}
