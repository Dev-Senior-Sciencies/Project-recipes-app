import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Explore from '../pages/Explore';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import FoodIngredients from '../pages/FoodIngredients';
import DrinkIngredients from '../pages/DrinkIngredients';
import FoodNationalities from '../pages/FoodNationalities';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import FoodDetails from '../pages/FoodDetails';
import DrinkDetails from '../pages/DrinkDetails';
import DrinkInProgress from '../pages/DrinkInProgress';
import FoodInProgress from '../pages/FoodInProgress';
import NotFound from '../pages/NotFound';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route exact path="/explore/foods/ingredients" component={ FoodIngredients } />
      <Route exact path="/explore/drinks/ingredients" component={ DrinkIngredients } />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ FoodNationalities }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/foods/:id" component={ FoodDetails } />
      <Route exact path="/drinks/:id" component={ DrinkDetails } />
      <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
      <Route exact path="/foods/:id/in-progress" component={ FoodInProgress } />
      <Route component={ NotFound } />
    </Switch>
  );
}
export default Routes;
