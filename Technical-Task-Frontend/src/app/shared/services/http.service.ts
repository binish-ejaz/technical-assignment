import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/core/environment';
import { HttpOptions } from 'src/app/core/types/http-option.type';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  setApiUrl(url: string) {
    return url.replace(/^\/?api/i, environment.apiUrl);
  }
  setOptions(option: HttpOptions | HttpOptions[], argument: any = null) {
    const defaultOptions = {
      headers: new HttpHeaders(),
    };
    if (Array.isArray(option)) {
      option.forEach((opt) => {
        this.setDefaultOptions(opt, defaultOptions, argument);
      });
    } else {
      this.setDefaultOptions(option, defaultOptions, argument);
    }
    return defaultOptions;
  }

  private setDefaultOptions(
    option: HttpOptions | HttpOptions[],
    defaultOptions: any,
    argument: any = null
  ) {
    if (option === 'form') {
      defaultOptions.headers = defaultOptions.headers.set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      );
    } else if (option === 'json') {
      defaultOptions.headers = defaultOptions.headers.set(
        'Content-Type',
        'application/json'
      );
    } else if (option === 'text') {
      defaultOptions.responseType = 'text';
    } else if (option === 'array-buffer') {
      defaultOptions.headers = defaultOptions.headers.set(
        'Content-Type',
        'application/json'
      );
      defaultOptions.responseType = 'arraybuffer' as 'json';
    } else if (option === 'bodyInRequestOptions') {
      defaultOptions.headers = defaultOptions.headers.set(
        'Content-Type',
        'application/json'
      );
      defaultOptions.body = argument;
    }
  }

  get(url: string, option: HttpOptions | HttpOptions[]): Observable<any> {
    return this._http.get(this.setApiUrl(url), this.setOptions(option));
  }
  put(url: string, body: any, options: HttpOptions | HttpOptions[]): Observable<any> {
    return this._http.put(this.setApiUrl(url), body, this.setOptions(options));
  }
}
