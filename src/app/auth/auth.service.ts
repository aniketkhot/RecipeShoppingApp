import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment"

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  registered?: boolean;
}
@Injectable({
  providedIn: "root",
})
export class AuthService {
  userSub = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.firebaseKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errRes) => this.handleError(errRes)),
        tap((resData) => {
          this.authenticateUser(resData);
        })
      );
  }
  LogIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.firebaseKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.authenticateUser(resData);
        })
      );
  }

  LogOut() {
    localStorage.removeItem('userData');
    this.userSub.next(null);
    this.router.navigate(["/auth"]);
    if (this.tokenExpirationTimer) {
      console.log(this.tokenExpirationTimer);
      clearTimeout(this.tokenExpirationTimer);
      console.log(this.tokenExpirationTimer +"tokenExpirationTimer ref");
    }
    this.tokenExpirationTimer = null;
  }

  AutoLogIn() {
    const user: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));

    if (!user) {
      return;
    }
    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );

    if (loadedUser.token) {
      console.log("in autoLogin");
      console.log(user._tokenExpirationDate)
      this.userSub.next(loadedUser);
      const expirationDuration =
        new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
        console.log(expirationDuration)
      this.autoLogOut(expirationDuration);
    }
  }

  autoLogOut(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.LogOut();
    }, expirationDuration);
  }

  private authenticateUser(resData) {
    console.log("in athentication");
    const expDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expDate
    );
    this.userSub.next(user);
    this.autoLogOut(resData.expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private handleError(errRes: HttpErrorResponse) {
    console.log("in handle error");
    let errorMessage = "an unknown error occured";
    if (!errRes.error || !errRes.error.error) {
      return throwError(errorMessage);
    }

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

    return throwError(errorMessage);
  }
}
