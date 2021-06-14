import { Injectable } from "@angular/core";
import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";

import { exhaustMap, take, map } from "rxjs/operators";
import { AuthService } from "./auth.service";
import * as FromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<FromApp.AppState>
  ) {}
  intercept(req: HttpRequest<any>, handler: HttpHandler) {
    return this.store.select("auth").pipe(
      // tap(u => console.error(u)),
      take(1),
      map((authState) => authState.user),
      exhaustMap((user) => {
        if (!user) {
          console.log("user is null");
          return handler.handle(req);
        }
        console.log("user is available");
        const modReq = req.clone({
          params: new HttpParams().set("auth", user.token),
        });

        return handler.handle(modReq);
      })
    );
  }
}
