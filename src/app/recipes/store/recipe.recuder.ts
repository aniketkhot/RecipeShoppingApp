import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";
import * as RecipeActions from "./recipe.actions";

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function recipeReducer(
  state = initialState,
  action: RecipeActions.RecipeActions
): State {
  switch (action.type) {
    case RecipeActions.SET_RECIPE:
      console.log("setting recipe");
      console.log(action.payload);
      return {
        ...state,
        recipes: [...action.payload],
      };

    case RecipeActions.ADD_RECIPE:
      console.log(action.payload);
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };

    case RecipeActions.UPDATE_RECIPE:
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.id] = { ...action.payload.newRecipe };
      return {
        ...state,
        recipes: updatedRecipes,
      };

    case RecipeActions.DELETE_RECIPE:
      return { ...state, 
        recipes : state.recipes.filter((recipe, index)=> {
            return action.payload !== index; 
        })
     };
    default:
      return state;
  }
}
