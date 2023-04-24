import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IControl } from '../interfaces/control.interface';

@Injectable({
  providedIn: 'root',
})
export class RespService {
  private readonly apiUrl =
    'https://cv-generator-backend.onrender.com/api/responsibilities';

  constructor(private http: HttpClient) {}

  public getResp(): Observable<IControl[]> {
    return this.http.get<{ data: any[] }>(this.apiUrl).pipe(
      map((response) =>
        response.data.map((item) => {
          return { title: item.attributes.name, id: item.id };
        })
      )
    );
  }
}
