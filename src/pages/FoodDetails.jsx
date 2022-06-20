import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import RecomendationCards from '../cards/RecomendationCards';
import ShareAndFavFood from '../components/ShareAndFav';
import './FixedButton.css';

function FoodDetails() {
  const [food, setFood] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const idNumber = pathname.split('foods/')[1];

  useEffect(() => {
    const fetchById = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idNumber}`;
      const response = await fetch(url);
      const data = await response.json();
      setFood(data.meals);
    };
    fetchById();
  }, [idNumber]);

  useEffect(() => {
    const verifyRecipeInProgress = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    console.log(verifyRecipeInProgress);
    if (verifyRecipeInProgress !== null && verifyRecipeInProgress.meals
      && verifyRecipeInProgress.meals[idNumber]) {
      setInProgress(true);
    }
  }, []);

  if (food.length === 0) {
    return (<div>Carregando...</div>);
  }

  const ingredients = Object.values(Object.fromEntries(Object.entries(food[0])
    .filter(([key]) => key.includes('Ingredient')))).filter((e) => e !== null);

  const measures = Object.values(Object.fromEntries(Object.entries(food[0])
    .filter(([key]) => key.includes('Measure')))).filter((e) => e !== null);

  const totalIngredients = ingredients
    .map((element, index) => (
      measures[index]
        ? element.concat(` - ${measures[index]}`)
        : element
    ));

  const verifyProgress = () => {
    const { idMeal: id } = food[0];
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
        src={ food[0].strMealThumb }
        alt="ilustração da receita"
      />
      <h1 data-testid="recipe-title">
        {food[0].strMeal}
      </h1>
      <p data-testid="recipe-category">{food[0].strCategory}</p>
      <ShareAndFavFood recipeContent={ food } />
      <h3>Ingredients</h3>
      {totalIngredients.map((element, index) => (
        <div key={ index }>
          <p data-testid={ `${index}-ingredient-name-and-measure` }>{element}</p>
        </div>
      ))}
      <h3>Instructions</h3>
      <p data-testid="instructions">{food[0].strInstructions}</p>
      <h3>Video</h3>
      <p>{food[0].strYoutube}</p>
      <iframe
        data-testid="video"
        src={ `https://www.youtube.com/embed/${food[0].strYoutube.split('v=')[1]}` }
        allow="encrypted-media"
        title="video"
      />
      <RecomendationCards type="food" />
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

// Explicação para utilização do embed no lugar do watch, tendo que fazer o split para pegar somente o id do vídeo
// https://stackoverflow.com/questions/25661182/embed-youtube-video-refused-to-display-in-a-frame-because-it-set-x-frame-opti
export default FoodDetails;
