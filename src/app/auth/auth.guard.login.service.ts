import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class LoginGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.store.select("auth").pipe(
      take(1),
      map((authState) => authState.user),
      map((user) => {
        const isAuth = !!user;
        if (!isAuth) {
          return true;
        }
        return this.router.createUrlTree(["/recipes"]);
      })
    );
  }
}
