import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { RecipeDataService } from "../shared/recipe-data.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: "root",
})
export class RecipeResolver implements Resolve<Recipe[]> {
  constructor(
    private dataService: RecipeDataService,
    private recipesService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0) {
      console.log("in recipe resolver");
      return this.dataService.fetchRecipesData();
    }
  }
}
