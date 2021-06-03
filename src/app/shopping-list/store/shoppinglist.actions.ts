import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const UPDATE_INGREDIENT = "UPDATE_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const START_EDIT_INGREDIENT = "START_EDIT_INGREDIENT";
export const END_EDIT_INGREDIENT = "END_EDIT_INGREDIENT";

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  payload: Ingredient;

  constructor(payload: Ingredient) {
    this.payload = payload;
  }
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload:Ingredient ) {}
}

export class deleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;

  constructor() {}
}

export class StartEditIngredient implements Action {

  readonly type = START_EDIT_INGREDIENT;

  constructor(public payload: number) {}
}

export class EndEditIngredinet implements Action {
  readonly type = END_EDIT_INGREDIENT;

  constructor() {}
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | deleteIngredient
  | StartEditIngredient
  | EndEditIngredinet;
