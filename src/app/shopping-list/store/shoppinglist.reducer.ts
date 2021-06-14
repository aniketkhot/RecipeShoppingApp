
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shoppinglist.actions";



export interface State {
  ingredients: Ingredient[];
  editMode: boolean;

  editIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
  editMode: false,
  editIngredientIndex: -1,

};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
):State {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      // let ings = state.ingredients.slice();
      // ings[action.payload.index] = action.payload.newIngredient;

      //const ingredient = {...state.ingredient};
      const ing = state.ingredients[state.editIngredientIndex]
      const updatedIng = {
        ...ing,
        ...action.payload
      }
      const ings = [...state.ingredients];
      ings[state.editIngredientIndex] = updatedIng;

      return {
        ...state,
        ingredients: ings,
        editMode: false,
        editIngredientIndex: -1,

      };

    case ShoppingListActions.DELETE_INGREDIENT:
      // const ingredients = [...state.ingredients];
      // ingredients.splice(action.payload);
      const ingrs = state.ingredients.filter(
        (i, index) => index !== state.editIngredientIndex
      );
      return {
        ...state,
        ingredients: ingrs,
        editIngredientIndex : -1

      };

    case ShoppingListActions.START_EDIT_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients],
        // ingredient: {...state.ingredients[action.payload]},
        editMode: true,
        editIngredientIndex: action.payload,

      };

    case ShoppingListActions.END_EDIT_INGREDIENT:
      return {
        ...state,
        // ingredient : null,
        editMode: false,
        editIngredientIndex: -1,

      };
    default:
      return state;
  }
}
