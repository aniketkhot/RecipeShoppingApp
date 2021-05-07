import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { catchError, exhaustMap, map, take, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";
import { Ingredient } from "./ingredient.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class RecipeDataService {
  fetchedRecSub: Subject<Recipe[]> = new Subject<Recipe[]>();
  firstLoad: boolean = true;
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) {}

  saveRecipesData() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http
      .put(
        "https://recipes-f85b3-default-rtdb.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  fetchRecipesData() {
    return this.http
      .get<Recipe[]>(
        "https://recipes-f85b3-default-rtdb.firebaseio.com/recipes.json"
      )
      .pipe(
        map((res: Recipe[]) => {
          console.log(res);
          return res.map((r) => {
            console.log(r);
            return { ...r, ingredients: r.ingredients ? r.ingredients : [] };
          });
        }),
        tap((res: Recipe[]) => {
          this.recipeService.setRecipes(res);
        }),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  // deleteSingleRecipe(id: number) {
  //   this.http.delete("https://recipes-f85b3-default-rtdb.firebaseio.com/recipes/3.json").subscribe();
  // }
}
