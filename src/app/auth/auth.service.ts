import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "./user.model";

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
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwI2-o71HakkV03T3at7-k1c01xU8fB2w",
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
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwI2-o71HakkV03T3at7-k1c01xU8fB2w",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError), tap(resData =>{
        this.authenticateUser(resData);
      }));
  }

  private authenticateUser(resData) {

    const expDate = new Date(new Date().getTime() + +resData.expiresIn * 1000)
    const user = new User(resData.email, resData.localId, resData.idToken, expDate);
    this.userSub.next(user);
  }

  private handleError(errRes: HttpErrorResponse) {
    console.log('in handle error')
    let errorMessage = "an unknown error occured";
    if (!errRes.error || !errRes.error.error) {
      return throwError(errorMessage);
    }
    console.log(errRes);
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
