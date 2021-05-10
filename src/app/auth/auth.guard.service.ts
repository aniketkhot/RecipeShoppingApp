import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGaurdService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | UrlTree | Observable<boolean | UrlTree> {
    console.log('in guard')
    return this.authService.userSub.pipe(

      map(user => {
        const isAuth = !!user;
        if(isAuth) {
          console.log( !user + ' in guard')
          return true;
        }
        return this.router.createUrlTree(['/auth'])
      })
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(["/auth"]);
      //   }
      // })
    )


  }
}
