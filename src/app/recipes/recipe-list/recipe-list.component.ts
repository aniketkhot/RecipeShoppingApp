import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Recipe } from "../recipe.model";
import * as FromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import * as RecipeActions from "../store/recipe.actions"

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<FromApp.AppState>
  ) {}

  ngOnInit() {
    // this.store.dispatch(new RecipeActions.FetchRecipe())
    
    this.subscription = this.store.select('recipes')
      .pipe(map((resState) => resState.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
    // this.recipes = this.recipeService.getRecipes();
    // this.recipeDataService.fetchRecipesData();
  }

  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
