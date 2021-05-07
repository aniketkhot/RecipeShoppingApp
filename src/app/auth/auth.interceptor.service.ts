import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, handler: HttpHandler) {
    const modifiedReq = req.clone();

    return this.authService.userSub.pipe(
      exhaustMap((user) => {

        if(!user) {
          return handler.handle(req);
        }

        modifiedReq.params.append("auth", user.token);
        return handler.handle(modifiedReq);
      })
    );
  }
}
