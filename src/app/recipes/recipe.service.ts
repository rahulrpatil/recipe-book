import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shoping-list/shopping-list.service';
import {Subject} from 'rxjs';
@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Mysore masala dosa recipe',
      'A crisp dosa lathered with a fiery red chutney and stuffed with some mashed potato filling.',
      'http://www.ndtv.com/cooks/images/mysore.masala.dosa.1%20%281%29.jpg',
      [
        new Ingredient('urad dal (split black lentils)', 4),
        new Ingredient('fenugreek (methi) seeds', 1),
        new Ingredient('raw rice (chawal)', 1),
        new Ingredient('hick beaten rice (poha)', 2)
      ]),
    new Recipe(
      'Samosa recipe',
      'Somosa is a fried or baked dish with a savoury filling, such as spiced potatoes, onions,peas etc',
      'http://img.tasteofcity.com/tasteimages/201707/image_original/6B9F09F3DFFA26FC_Tamana-Food-Stall-ka-Samosa.jpg',
      [
        new Ingredient('maida', 1),
        new Ingredient('oil', 1),
        new Ingredient('boiled potatoes', 1),
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipies() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
