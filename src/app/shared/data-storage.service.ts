import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';


@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-927c0.firebaseio.com/recipes.json',
      this.recipeService.getRecipies());
  }

  getRecipes() {
      this.http.get('https://ng-recipe-book-927c0.firebaseio.com/recipes.json')
        .pipe(map(
          (response : HttpResponse) => {
            const recipes: Recipe[] = response;
            for (let recipe of recipes) {
              if(!recipe['ingredients']) {
                recipe.ingredients = [];
              }
            }
            return recipes;
          }
        ))
        .subscribe((recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        })
  }
}
