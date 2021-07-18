import { Action } from "@ngrx/store";

import { User } from "../user.model";

export const LOGIN_START = "[Auth] login start";

export const AUTHENTICATE_SUCCECC = "[Auth] login";

export const AUTHENTICATE_FAIL = "[Auth] login failed";

export const LOG_OUT = "[Auth] logout";

export const SIGNUP_START = "[Auth] Signup start";

export const CLEAR_ERROR = "[Auth] Clear error";

export const AUTO_LOGIN = "[Auth] auto login"

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCECC;

  constructor(public payload: User) {}
}

export class Logout implements Action {
  readonly type = LOG_OUT;

  constructor() {}
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;

}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}


export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | SignupStart
  | LoginStart
  | ClearError
  | AutoLogin
  | AuthenticateFail;
