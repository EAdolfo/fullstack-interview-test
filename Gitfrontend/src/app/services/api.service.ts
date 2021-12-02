import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  errors = [];

  public url = environment.url;

  url_params(params: {}) {
    let list = [];
    for (let key in params) {
      list.push(key + '=' + params[key]);
    }
    return list.length > 0 ? '?' + list.join('&') : '';
  }

  get options() {
    // let head_data = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'};
    let head_data = {'Content-Type': 'application/json'};
    const headers = new HttpHeaders(head_data);
    return {headers: headers};
  }

  get(endpoint: string, params?: {}) {
    const url = this.url + endpoint;
    return new Promise((resolve, reject) => {
      this.http.get(url + this.url_params(params), this.options).subscribe((res: any) => {
        resolve(this.processResponse(res));
      }, (err: any) => {
        resolve(this.processErrors(err));
      });
    });
  }

  post(endpoint: string, params?: {}, data?: {}) {
    const url = this.url + endpoint + this.url_params(params);
    return new Promise((resolve, reject) => {
      this.http.post(url, data, this.options).subscribe((res: any) => {
        resolve(this.processResponse(res));
        }, (err: any) => {
        resolve(this.processErrors(err));
      });
    });
  }

  processResponse(response: any) {
    try {
      this.errors = response.errors || [];
    } catch (e) {
      response = {
        code: 500,
        message: 'Error desconocido'
      };
      this.errors = [response.message];
    }
    try {
      return JSON.parse(response._body);
    } catch (e) {
      return response;
    }
  }

  processErrors(error?: any) {
    const text = error.statusText || 'Error en la conexión. Inténtelo de nuevo más tarde...';
    const code = error.status || 500;
    this.errors = [text];
    return {
      code: code,
      message: text,
      errors: [text]
    };
  }
}
