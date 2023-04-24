import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { PermissionsService } from '../services/permissions.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private permissions: PermissionsService) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.permissions.checkAuth() ? next.handle(request) : EMPTY;
  }
}
