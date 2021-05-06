import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { RecipeDataService } from "../shared/recipe-data.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe[]> {

  constructor(private dataService: RecipeDataService,private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    if(this.recipeService.getRecipes().length === 0)
    {
      return this.dataService.fetchRecipesData()
    }
  }
}
