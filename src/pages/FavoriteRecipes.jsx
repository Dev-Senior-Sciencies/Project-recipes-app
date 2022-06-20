import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import FavoriteCard from '../cards/FavoriteCard';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [recipes, setRecipes] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')));

  const filterAll = () => {
    setRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  const filterFood = () => {
    const allFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setRecipes(allFav.filter((element) => element.type === 'food'));
  };

  const filterDrink = () => {
    const allFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setRecipes(allFav.filter((element) => element.type === 'drink'));
  };

  return (
    <>
      <Header pageName="Favorite Recipes" needRender={ false } />
      <Button
        onClick={ filterAll }
        data-testid="filter-by-all-btn"
        type="button"
      >
        All

      </Button>
      <Button
        onClick={ filterFood }
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food

      </Button>
      <Button
        onClick={ filterDrink }
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks

      </Button>

      { recipes && <FavoriteCard recipe={ recipes } />}
    </>
  );
}

export default FavoriteRecipes;
