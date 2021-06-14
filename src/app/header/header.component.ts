import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeDataService } from '../shared/recipe-data.service';
import * as FromApp from "../store/app.reducer"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean= false;
  constructor(private dataService: RecipeDataService, private authService: AuthService, private store: Store<FromApp.AppState>) {}

  ngOnInit() {
    this.store.select('auth').subscribe(authState =>
    {
      this.isAuthenticated = !authState.user ? false : true;
    }
      )
  }
  onSaveData() {
    this.dataService.saveRecipesData();
  }

  onFetchData() {
    let recs: Recipe[];
    this.dataService.fetchRecipesData().subscribe();
  }

  onLogOut() {
    this.authService.LogOut();

  }
}
