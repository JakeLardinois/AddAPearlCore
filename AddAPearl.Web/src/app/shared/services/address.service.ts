import { Injectable }     from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
// Add the RxJS Observable operators.
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { IAddress } from '../index';

@Injectable()
export class AddressService {
  private addressesUrl = 'http://localhost:19750/api/addresses';  // URL to web API
  constructor (private http: Http) {}
  public createAddress (address: IAddress) {
    delete address.addressId; // Need to remove null key property or else the API ModelBinder Fails
    let payload = address;
    let bodyString = JSON.stringify(payload); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(`${this.addressesUrl}/address`, bodyString, options )
          .map((response: Response) => <IAddress> response.json())
          .toPromise()
          .catch((err: any) => {
            console.log(err); // again, customize me please
            return Promise.reject(err);
          });
  }

  public patchAddress (address: IAddress, patchcommands: any): Observable<IAddress> {
      let bodyString = JSON.stringify(patchcommands); // Stringify payload
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option
      return this.http.patch(`${this.addressesUrl}/address/${address.addressId}`, bodyString, options )
            .map((response: Response) => <IAddress> response.json())
            .do((data) => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
