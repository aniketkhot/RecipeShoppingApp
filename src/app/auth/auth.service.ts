import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import * as AuthActions from "./store/auth.actions";
import * as FromRoot from "../store/app.reducer";

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
  private tokenExpirationTimer: any = null;

  constructor(public store: Store<FromRoot.AppState>) {}

  setTimerForAutoLogOut(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearTimerForAutoLogout() {
    if (this.tokenExpirationTimer) {
      clearInterval(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
