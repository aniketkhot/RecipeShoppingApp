import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const SET_RECIPE = "[Recipe] Set recipe";

export const FETCH_RECIPE = "[Recipe] fetch recipe";

export const ADD_RECIPE = "[Recipe] Add Recipe";

export const UPDATE_RECIPE = "[Recipe] Update Recipe"

export const DELETE_RECIPE = "[Recipe] Delete Recipe";

export const STORE_RECIPE = "[Recipe] store recipe";

export class SetRecipe implements Action {
  readonly type = SET_RECIPE;

  constructor(public payload: Recipe[]) {}
}

export class FetchRecipe implements Action {
  readonly type = FETCH_RECIPE;

  constructor() {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class StoreRecipe implements Action {
  readonly type = STORE_RECIPE;
  constructor() {}
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;

    constructor( public payload : {id: number, newRecipe:Recipe}) {}
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;

    constructor(public payload:number) {}
}

export type RecipeActions = SetRecipe | AddRecipe | DeleteRecipe | UpdateRecipe ;
