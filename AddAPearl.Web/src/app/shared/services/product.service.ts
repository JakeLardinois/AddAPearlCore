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
  IProduct,
} from '../index';
import {
  Config
} from '../../../config';

@Injectable()
export class ProductService {
  private productsUrl = Config.webApiUrl + '/products'; // URL to web API
  constructor(
    private http: HttpClient,
  ) {
    // constructor code...
  }
  public getProducts(): Observable < IProduct[] > {
    return this.http.get < IProduct[] > (this.productsUrl);
  }

  public createProduct(product: IProduct) {
    delete product.productId; // Need to remove null key property or else the API ModelBinder Fails
    const payload = product;
    const bodyString = JSON.stringify(payload); // Stringify payload
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(`${this.productsUrl}/product`, bodyString, {
      headers
    });
  }

  public patchProduct(product: IProduct, patchcommands: any): Observable < IProduct > {
    const bodyString = JSON.stringify(patchcommands); // Stringify payload
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.patch < IProduct > (`${this.productsUrl}/product/${product.productId}`, bodyString, {
      headers
    });
  }

  public deleteProduct(product: IProduct) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.delete < IProduct > (`${this.productsUrl}/product/${product.productId}`, {
      headers
    });
  }
}
