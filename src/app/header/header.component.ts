import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeDataService } from '../shared/recipe-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean= false;
  constructor(private dataService: RecipeDataService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.userSub.subscribe(user =>
    {
      this.isAuthenticated = !user ? false : true;
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
