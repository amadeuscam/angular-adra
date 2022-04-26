import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concat, concatMap, Observable, throwError } from 'rxjs';
import { JwtDTO } from '../models/jwt-dto';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class BenInterceptorService implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (!this.tokenService.isLogged()) {
      return next.handle(req);
    }


    let intReq = req;
    const token = this.tokenService.getToken();

    intReq = req.clone(
      {
        headers: req.headers.set("Authorization", "Bearer " + token)
      }
    )

    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {

      if (err.status === 401) {
        const dto: JwtDTO = new JwtDTO(this.tokenService.getToken());
        return this.authService.refresh(dto).pipe(concatMap((data: any) => {
          console.log("refreshing......");
          this.tokenService.setToken(data.token)
          intReq = req.clone(
            {
              headers: req.headers.set("Authorization", "Bearer " + data.token)
            }
          )
          return next.handle(intReq);
        }))

      } else {
        console.log("session caducada");
        this.tokenService.logOut();
        return throwError(err)
      }


    }));
  }
}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: BenInterceptorService, multi: true }]
