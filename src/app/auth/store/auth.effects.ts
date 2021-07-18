import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import * as AuthActions from "./auth.actions";
import { environment } from "src/environments/environment";
import { of } from "rxjs";
import { User } from "../user.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  @Effect()
  authLoginStart = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authLoginStart: AuthActions.LoginStart) => {
      console.log("in effect login start");
      return this.http
        .post<AuthResponseData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
            environment.firebaseKey,
          {
            email: authLoginStart.payload.email,
            password: authLoginStart.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          
          map((data: AuthResponseData) => {
            return this.authenticateUser(
              data.email,
              data.localId,
              data.idToken,
              data.expiresIn
            );
          }),
          catchError(this.HandleError)
        );
    })
  );

  @Effect()
  authSignUpStart = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupStart: AuthActions.SignupStart) => {
      console.log("signup start ");
      return this.http
        .post<AuthResponseData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            environment.firebaseKey,
          {
            email: signupStart.payload.email,
            password: signupStart.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((data: AuthResponseData) => {
            return this.authenticateUser(
              data.email,
              data.localId,
              data.idToken,
              data.expiresIn
            );
          }),
          catchError(this.HandleError)
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccessNavigation = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCECC),
    tap((authSuc:AuthActions.AuthenticateSuccess) => {
      console.log("in navigation effect");
      if(authSuc.payload.redirect) {
        this.router.navigate(["recipes"]);
      }
    })
  );

  @Effect({ dispatch: false })
  authLogOut = this.actions$.pipe(
    ofType(AuthActions.LOG_OUT),
    tap(() => {
      localStorage.removeItem("userData");
      this.router.navigate(["auth"]);
      this.authService.clearTimerForAutoLogout();
    })
  );

  @Effect()
  authAutoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const user: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem("userData"));

      if (!user) {
        return{type : "dummy"}
      }
      const loadedUser = new User(
        user.email,
        user.id,
        user._token,
        new Date(user._tokenExpirationDate)
      );

      if (loadedUser.token) {
        console.log("in autoLogin");
        console.log(user._tokenExpirationDate);
        const expirationDuration =
          new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setTimerForAutoLogOut(expirationDuration);
        return new AuthActions.AuthenticateSuccess(loadedUser);
      }
      return{type : "dummy"}
    })
  );

  authenticateUser(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: string
  ): AuthActions.AuthenticateSuccess {
    console.log("in effects success");
    const expiresInMiliSec = +expiresIn * 1000;
    const expDate = new Date(new Date().getTime() + expiresInMiliSec );
    var user = new User(email, localId, idToken, expDate, true);
    localStorage.setItem("userData", JSON.stringify(user));
    this.authService.setTimerForAutoLogOut(expiresInMiliSec);
    return new AuthActions.AuthenticateSuccess(user);
  }

  HandleError(errRes: HttpErrorResponse) {
    console.log("in effects false");
    let errorMessage = "an unknown error occured";
    if (!errRes.error || !errRes.error.error) {
      return of(new AuthActions.AuthenticateFail(errorMessage));
    }
    ``;

    switch (errRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "this email is already taken";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "please first register by signing up";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "password is invalid. please try again";
        break;
    }
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
