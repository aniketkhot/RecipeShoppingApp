
import * as FromShoppingList from "../shopping-list/store/shoppinglist.reducer"
import * as fromAuth from "../auth/store/auth.reducer"
import * as fromRecipes from "../recipes/store/recipe.recuder"
import {ActionReducerMap} from "@ngrx/store"


export interface AppState {
  shoppingList: FromShoppingList.State,
  auth: fromAuth.State,
  recipes: fromRecipes.State
}

export const appReducers:ActionReducerMap<AppState> = {
  shoppingList : FromShoppingList.shoppingListReducer,
  auth : fromAuth.authReducer,
  recipes: fromRecipes.recipeReducer
}