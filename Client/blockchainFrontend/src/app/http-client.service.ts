import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  // private async request(method: string, url: string, data?: any) {
  //   // const token = await this.oktaAuth.getAccessToken();

  //   const result = this.http.request(method, url, {
  //     body: data,
  //     responseType: 'json',
  //     observe: 'body',
  //     headers: {
  //     }
  //   });
  //   return new Promise((resolve, reject) => {
  //     result.subscribe(resolve, reject);
  //   });
  // }

  getKeys(base) {
    return this.http
    .post<any>(`${environment.cryptoUrl}/keys`, base)
    .pipe(map(data => data));
  }

  signMessage(values: any) {
    return this.http.post<any>(`${environment.cryptoUrl}/sign`, values);
  }

  getChain() {
    return this.http
    .get<any>(`${environment.serverUrl}/chain`)
    .pipe(map(data => data));
  }

  getUTXO() {
    return this.http
    .get<any>(`${environment.serverUrl}/utxo`)
    .pipe(map(data => data));
  }

  getHistory(batchID) {
    return this.http
    .post<any>(`${environment.serverUrl}/history`, batchID)
    .pipe(map(data => data));
  }

  createNewTransaction(values: any) {
    return this.http.post<any>(`${environment.serverUrl}/transactions/new`, values);
  }

  getTransactionInput(values: any) {
    return this.http.post<any>(`${environment.serverUrl}/transactions/input`, values);
  }

}
