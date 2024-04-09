import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { Rectangle } from './rectangle.model';

@Injectable({
  providedIn: 'root'
})
export class RectangleService {

  constructor(private _httpService: HttpService) { }

  getRectangle(): Observable<Rectangle>{
    return this._httpService.get('api/rectangle', 'normal');
  }

  updateRectangle(rectangle : Rectangle): Observable<Rectangle>{
    return this._httpService.put('api/rectangle/update',rectangle ,'json');
  }

}
