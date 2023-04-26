import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = null;

  constructor(private http: HttpClient) {}

  public login(user: IUser): Observable<any> {
    return this.http
      .post<any>('http://localhost:1337/api/auth/local', user)
      .pipe(
        tap((response) => {
          localStorage.setItem('auth-token', response.jwt);
          this.setToken(response.jwt);
        })
      );
  }

  public setToken(token: string): void {
    this.token = 'Bearer ' + token;
  }

  public getToken() {
    return 'Bearer ' + localStorage.getItem('auth-token');
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('auth-token');
  }
}
