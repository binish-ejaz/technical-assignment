import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonReaderService {
  constructor(private _http: HttpClient) {}

  readJsonFile(filePath: string): Observable<any> {
    return this._http.get(filePath);
  }
}
