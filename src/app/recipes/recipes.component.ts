import { Component, OnInit } from '@angular/core';
import { RecipeDataService } from '../shared/recipe-data.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private recDataService: RecipeDataService) { }

  ngOnInit() {
    console.log(' in recipes.component')
    // if(this.recDataService.firstLoad) {
    //   this.recDataService.fetchRecipesData().subscribe()
    //   this.recDataService.firstLoad = false;
    // }
  }

}
