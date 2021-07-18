import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map} from "rxjs/operators";
import * as FromApp from "../store/app.reducer"

@Injectable({
  providedIn: "root",
})
export class AuthGaurdService implements CanActivate {
  constructor(private router: Router,private store: Store<FromApp.AppState>) {}

  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | UrlTree | Observable<boolean | UrlTree> {
    console.log('in guard')
    return this.store.select('auth').pipe(

      map(authState => {
        const isAuth = !!authState.user;
        if(isAuth) {
          console.log( isAuth + ' in guard')
          return true;
        }
        return this.router.createUrlTree(['auth'])
      })
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(["/auth"]);
      //   }
      // })
    )


  }
}
