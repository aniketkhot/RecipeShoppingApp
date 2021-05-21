import { Injectable } from "@angular/core";
import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";

import { exhaustMap, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, handler: HttpHandler) {


    return this.authService.userSub.pipe(
      // tap(u => console.error(u)),
      take(1),
      exhaustMap((user) => {

        if(!user) {
          console.log('user is null')
          return handler.handle(req);
        }
        console.log('user is available')
        const modReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        })

        return handler.handle(modReq);
      })
    );
  }
}
