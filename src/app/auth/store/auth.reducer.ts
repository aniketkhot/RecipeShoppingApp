import {Action} from '@ngrx/store'
import {User} from '../user.model'
import * as AuthActions from './auth.actions'

export interface State {
  user: User
}

const initialState: State = {
  user: null

}

export function authReducer(state = initialState, action:AuthActions.AuthActions): State {

  switch(action.type) {
    case AuthActions.SIGN_UP:
      const user = action.payload
    return {
        ...state,
        user
      }
    case AuthActions.LOG_IN:
      return {
        ...state,
        user: action.payload
      }
      case AuthActions.LOG_OUT:
        return {
          ...state,
          user : null
        }

    default:
    return state;
  }


}
