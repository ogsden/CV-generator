import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IControl } from '../interfaces/control.interface';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  private readonly apiUrl =
    'https://cv-generator-backend.onrender.com/api/languages';

  constructor(private http: HttpClient) {}

  public getLanguages(): Observable<IControl[]> {
    return this.http.get<{ data: any[] }>(this.apiUrl).pipe(
      map((response) =>
        response.data.map((item) => {
          return { title: item.attributes.name, id: item.id };
        })
      )
    );
  }
}
