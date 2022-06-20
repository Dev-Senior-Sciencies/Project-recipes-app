import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import RecomendationCards from '../cards/RecomendationCards';
import ShareAndFavDrink from '../components/ShareAndFavDrink';
import './FixedButton.css';

function DrinkDetails() {
  const [drink, setDrink] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const idNumber = pathname.split('drinks/')[1];

  useEffect(() => {
    const fetchById = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idNumber}`;
      const response = await fetch(url);
      const data = await response.json();
      setDrink(data.drinks);
    };
    fetchById();
  }, [idNumber]);

  useEffect(() => {
    const verifyRecipeInProgress = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    if (verifyRecipeInProgress !== null && verifyRecipeInProgress.cocktails
      && verifyRecipeInProgress.cocktails[idNumber]) {
      // console.log(verifyRecipeInProgress.meals);
      setInProgress(true);
    }
  }, []);

  if (drink.length === 0) {
    return (<div>Carregando</div>);
  }
  // filtro para selecionar somente as keys com valor igual a Ingredient
  // https://masteringjs.io/tutorials/fundamentals/filter-key#:~:text=JavaScript%20objects%20don't%20have,()%20function%20as%20shown%20below.
  const ingredients = Object.values(Object.fromEntries(Object.entries(drink[0])
    .filter(([key]) => key.includes('Ingredient')))).filter((e) => e !== null);

  const measures = Object.values(Object.fromEntries(Object.entries(drink[0])
    .filter(([key]) => key.includes('Measure')))).filter((e) => e !== null);

  const totalIngredients = ingredients
    .map((element, index) => (
      measures[index]
        ? element.concat(` - ${measures[index]}`)
        : element
    ));

  const verifyProgress = () => {
    const { idDrink: id } = drink[0];
    const actualState = { id };
    const recipeIsDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipeIsDone) {
      if (recipeIsDone.find((elemento) => elemento
        .id === actualState.id) !== undefined) {
        return false;
      }
      return true;
    }
    return true;
  };

  const redirectInProgress = () => {
    history.push(`${pathname}/in-progress`);
  };

  return (
    <div>
      <img
        width={ 360 }
        data-testid="recipe-photo"
        src={ drink[0].strDrinkThumb }
        alt="Ilustração receita bebida"
      />
      <h1 data-testid="recipe-title">
        {drink[0].strDrink}
      </h1>
      <p data-testid="recipe-category">{drink[0].strAlcoholic}</p>
      <ShareAndFavDrink actualFood={ drink } />
      <h3>Ingredients</h3>
      {totalIngredients.map((element, index) => (
        <div key={ index }>
          <p data-testid={ `${index}-ingredient-name-and-measure` }>{element}</p>
        </div>
      ))}
      <h3>Instructions</h3>
      <p data-testid="instructions">{drink[0].strInstructions}</p>
      <RecomendationCards type="drink" />
      {verifyProgress()
        ? (
          <Button
            onClick={ redirectInProgress }
            data-testid="start-recipe-btn"
            className="start-recipe-button"
          >
            { inProgress ? 'Continue Recipe' : 'Start Recipe'}

          </Button>)
        : ''}
    </div>

  );
}

export default DrinkDetails;
