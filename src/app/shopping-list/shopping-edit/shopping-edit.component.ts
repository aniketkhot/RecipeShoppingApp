import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { Ingredient } from "../../shared/ingredient.model";

import * as ShoppingListActions from "../store/shoppinglist.actions";

import * as fromRoot from "../../store/app.reducer";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f", { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private store: Store<fromRoot.AppState>) {}

  ngOnInit() {
    this.store.select("shoppingList").subscribe((s) => {
      console.log("in edit");
      if (s.editIngredientIndex > -1) {
        var editedIng = s.ingredients[s.editIngredientIndex];
        this.editMode = true;
        this.slForm.setValue({
          name: editedIng.name,
          amount: editedIng.amount,
        });
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
    } else {
      //this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
    this.store.dispatch(new ShoppingListActions.EndEditIngredinet());
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    //this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.deleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.EndEditIngredinet());
  }
}
