import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '@services/auth';
import {inject} from '@angular/core';
import {catchError, switchMap, throwError} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  if (req.url.includes('/auth/login') || req.url.includes('/auth/refresh')) {
    return next(req);
  }

  const token = authService.getAccessToken();

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError(err => {
      if (err.status === 401 || err.status === 403) {
        return authService.refresh().pipe(

          switchMap((res) => {
            authService.setAccessToken(res.token);
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.token}`
              }
            });
            return next(retryReq);
          }),

          catchError(refreshError => {
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => err);
    })
  );
};
