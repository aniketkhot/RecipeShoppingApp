import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";

import { Recipe } from "./recipe.model";

import * as FromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";
import * as RecipeActions from "../recipes/store/recipe.actions";
import { Actions, ofType } from "@ngrx/effects";
import { map, take } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RecipeResolver implements Resolve<Recipe[]> {
  constructor(
    
    
    private store: Store<FromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isFetch = false;
    let recipes;
    this.store
      .select("recipes")
      .pipe(
        map((recipeState) => {
          if (recipeState.recipes.length === 0) {
            isFetch = true;
          } else {
            recipes = recipeState.recipes;
          }
        })
      )
      .subscribe();
    if (isFetch) {
      this.store.dispatch(new RecipeActions.FetchRecipe());

      return this.actions$.pipe(ofType(RecipeActions.SET_RECIPE), take(1));
    }
    return of(recipes);
  }
}
