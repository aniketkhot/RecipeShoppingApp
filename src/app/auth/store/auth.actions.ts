import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOG_IN = "LOGIN";

export const LOG_OUT = "LOGOUT";

export const SIGN_UP = "SIGNUP";

export class Signup implements Action {
  readonly type = SIGN_UP;

  constructor(public payload: User) {}
}

export class Login implements Action {
  readonly type = LOG_IN;

  constructor(public payload: User) {}
}

export class Logout implements Action {
  readonly type = LOG_OUT;

  constructor() {}
}

export type AuthActions = Login | Logout | Signup;
