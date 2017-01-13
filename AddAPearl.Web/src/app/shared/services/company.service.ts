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
	ICompany,
} from '../index';

@Injectable()
export class CompanyService {
	private companiesUrl = 'http://localhost:19750/api/companies'; // URL to web API
	constructor(
		private http: Http,
		private logger: Logger,
	) {
		// constructor code...
	}
	public getCompanies(): Observable < ICompany[] > {
		return this.http.get(this.companiesUrl)
			.map((response: Response) => < ICompany[] > response.json())
			.do((data) => this.logger.debug('Returned getCompanies: ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	public createCompany(company: ICompany) {
		delete company.companyId; // Need to remove null key property or else the API ModelBinder Fails
		let payload = company;
		let bodyString = JSON.stringify(payload); // Stringify payload
		let myheaders = new Headers({
			'Content-Type': 'application/json',
		}); // ... Set content type to JSON
		let options = new RequestOptions({
			headers: myheaders,
		}); // Create a request option
		return this.http.post(`${this.companiesUrl}/company`, bodyString, options)
			.map((response: Response) => < ICompany > response.json())
			.toPromise()
			.catch((err: any) => {
				this.logger.error('Company Service createCompany Error: ' + err);
				return Promise.reject(err);
			});
	}

	public patchCompany(company: ICompany, patchcommands: any): Observable < ICompany > {
		let bodyString = JSON.stringify(patchcommands); // Stringify payload
		let myheaders = new Headers({
			'Content-Type': 'application/json',
		}); // ... Set content type to JSON
		let options = new RequestOptions({
			headers: myheaders,
		}); // Create a request option
		return this.http.patch(`${this.companiesUrl}/company/${company.companyId}`, bodyString, options)
			.map((response: Response) => < ICompany > response.json())
			.do((data) => this.logger.debug('Returned patchCompany: ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	public deleteCompany(company: ICompany) {
		let myheaders = new Headers({
			'Content-Type': 'application/json',
		}); // ... Set content type to JSON
		let options = new RequestOptions({
			headers: myheaders,
		}); // Create a request option
		return this.http.delete(`${this.companiesUrl}/company/${company.companyId}`, options)
			.map((response: Response) => < ICompany > response.json())
			.toPromise()
			.catch((err: any) => {
				this.logger.error('Company Service deleteCompany Error: ' + err);
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
		this.logger.error('Company Service Error: ' + errMsg);
		return Observable.throw(error);
	}
}
