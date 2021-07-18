import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { Recipe } from "../recipes/recipe.model";
import * as FromApp from "../store/app.reducer";
import * as AuthAction from "../auth/store/auth.actions";
import * as RecipeActions from "../recipes/store/recipe.actions"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(
    private store: Store<FromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.select("auth").subscribe((authState) => {
      this.isAuthenticated = !authState.user ? false : true;
    });
  }
  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipe())
  }

  onFetchData() {
    let recs: Recipe[];
    // this.dataService.fetchRecipesData().subscribe();
    this.store.dispatch(new RecipeActions.FetchRecipe())
  }

  onLogOut() {
    this.store.dispatch(new AuthAction.Logout());
  }
}
