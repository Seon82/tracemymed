import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  private async request(method: string, url: string, data?: any) {
    // const token = await this.oktaAuth.getAccessToken();

    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {
      }
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }

  getKeys() {
    return this.request('GET', `${environment.serverUrl}/keys`);
  }

  createNewTransaction(values: any) {
    return this.request('POST', `${environment.serverUrl}/transaction/new`, values);
  }

}
