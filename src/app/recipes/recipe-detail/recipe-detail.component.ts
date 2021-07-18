import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Recipe } from "../recipe.model";
import * as FromApp from "../../store/app.reducer";
import { map, switchMap } from "rxjs/operators";
import * as RecipeActions from "../store/recipe.actions";
import * as ShoppingListActions from "../../shopping-list/store/shoppinglist.actions"

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<FromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params) => {
          return +params["id"];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select("recipes").pipe(
            map((recipeState) => {
              return recipeState.recipes.find((recipe, index) => {
                return index === this.id;
              });
            })
          );
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });

    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params["id"];
    //   // this.recipe = this.recipeService.getRecipe(this.id);
    //   this.store
    //     .select("recipes")
    //     .pipe(
    //       map((recipeState) => {
    //         return recipeState.recipes.find((recipe, index) => {
    //           if (this.id === index) {
    //             return recipe;
    //           }
    //         });
    //       })
    //     )
    //     .subscribe((recipe) => (this.recipe = recipe));
    // });
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id))
    // this.recipeService.deleteRecipe(this.id);
    // this.dataService.deleteSingleRecipe(this.id)
    this.router.navigate(["/recipes"]);
  }
}
