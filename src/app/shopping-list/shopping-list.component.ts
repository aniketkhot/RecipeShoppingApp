import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";


import * as ShoppingListActions from "../shopping-list/store/shoppinglist.actions"
import * as FromRoot from "../store/app.reducer"

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  // ingredients:Ingredient[]
  private subscription: Subscription;

  constructor(

    private store: Store<FromRoot.AppState>
  ) {}

  ngOnInit() {

    this.ingredients = this.store.select('shoppingList')

    // this.store.select('shoppingList').subscribe( sl => {
    //   this.ingredients = sl.ingredients
    // })

    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEditIngredient(index));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
