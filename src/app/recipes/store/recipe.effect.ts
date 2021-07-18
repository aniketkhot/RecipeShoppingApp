import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import * as RecipeActions from "../store/recipe.actions";
import * as FromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import { of, throwError } from "rxjs";

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipe = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPE),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        "https://recipes-f85b3-default-rtdb.firebaseio.com/recipes.json"
      );
    }),
    map((res) => {
      console.log(res);
      return res.map((r) => {
        console.log(r);
        return { ...r, ingredients: r.ingredients ? r.ingredients : [] };
      });
    }),
    map((recipes) => {
      return new RecipeActions.SetRecipe(recipes);
    }),
    catchError((err)=>{
      console.log(err)
      return of((err)=>{
        return throwError(err)
      })
    })
  );

  @Effect({ dispatch: false })
  storeRecipe = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPE),
    withLatestFrom(this.store.select("recipes")),
    switchMap(([storeRecipe, recipesState]) => {
      return this.http.put(
        "https://recipes-f85b3-default-rtdb.firebaseio.com/recipes.json",
        recipesState.recipes
      );
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<FromApp.AppState>
  ) {}
}
