import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User;
  errorMsg: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  errorMsg: null,
  loading: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
): State {
  switch (action.type) {
    // case AuthActions.SIGNUP_START:
    //   const user = action.payload;
    //   return {
    //     ...state,
    //     user,
    //   };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      console.log("in reducer login start");
      return {
        ...state,
        errorMsg: null,
        loading: true,
      };

    case AuthActions.AUTHENTICATE_SUCCECC:
      console.log("in reducer login");
      return {
        ...state,
        user: action.payload,
        errorMsg: null,
        loading: false,
      };

    case AuthActions.AUTHENTICATE_FAIL:
      console.log("in reducer login failed");
      return {
        ...state,
        errorMsg: action.payload,
        loading: false,
      };
    case AuthActions.LOG_OUT:
      return {
        ...state,
        user: null,
        errorMsg: null,
      };

      case AuthActions.CLEAR_ERROR:
        return {
          ...state,
          errorMsg : null
        }

    default:
      return state;
  }
}
