import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import ShareAndFavFood from '../components/ShareAndFav';
import './FixedButton.css';
import './FoodInProgess.css';
// teste
function FoodInProgress() {
  const [food, setFood] = useState('');
  const [enableButton, setEnableButton] = useState(true);
  const [storagedRecipes, setStoragedRecipes] = useState([]);
  const [arrayOfIngredients, setArrayOfIngredients] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const { pathname: id } = location;
  const idNumber = id.split('foods/')[1].split('/')[0];

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
    const chargeIngredient = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!chargeIngredient) {
      setStoragedRecipes({ meals: { [idNumber]: [] } });
    } else if (chargeIngredient.meals && chargeIngredient.meals[idNumber]) {
      setStoragedRecipes(chargeIngredient);
      setArrayOfIngredients(chargeIngredient.meals[idNumber]);
    } else if (chargeIngredient) {
      setStoragedRecipes({ ...chargeIngredient,
        ...{ meals: { [idNumber]: [] } } });
    }
  }, []);

  if (food.length === 0) {
    return (<div>Carregando</div>);
  }

  const ingredients = Object.values(Object.fromEntries(Object.entries(food[0])
    .filter(([key]) => key.includes('Ingredient')))).filter((e) => e !== null)
    .filter((ingredient) => ingredient.length > 0);

  const measures = Object.values(Object.fromEntries(Object.entries(food[0])
    .filter(([key]) => key.includes('Measure')))).filter((e) => e !== null);

  const totalIngredients = ingredients
    .map((element, index) => (
      measures[index]
        ? element.concat(` - ${measures[index]}`)
        : element
    ));

  const redirectDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const verifyFinishButton = () => {
    const checked = document.querySelectorAll('input[type=checkbox]:checked').length;
    const allCheckbox = document.querySelectorAll('input[type=checkbox]').length;
    if (checked === allCheckbox) {
      setEnableButton(false);
    } else {
      setEnableButton(true);
    }
  };

  const storagingIngredients = (array) => {
    const newRecipe = storagedRecipes;
    newRecipe.meals[idNumber] = [...array];
    localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipe));
  };

  const handleCheckAndSave = ({ target }) => {
    let newArray = [];
    if (arrayOfIngredients.includes(target.name)) {
      newArray = arrayOfIngredients.filter((elem) => elem !== target.name);
    } else {
      newArray = [...arrayOfIngredients, target.name];
    }
    storagingIngredients(newArray);
    setArrayOfIngredients(newArray);
    const test = arrayOfIngredients.some((el) => el === target.name);
    target.checked = !test;
    verifyFinishButton();
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
        <div key={ index } data-testid={ `${index}-ingredient-step` }>
          <input
            onChange={ (e) => handleCheckAndSave(e) }
            type="checkbox"
            name={ element }
            checked={ arrayOfIngredients
              && arrayOfIngredients.some((item) => item === element) }
          />
          <label htmlFor={ element }>
            { element }
          </label>
        </div>
      ))}
      <h3>Instructions</h3>
      <p data-testid="instructions">{food[0].strInstructions}</p>
      <Button
        disabled={ enableButton }
        onClick={ redirectDoneRecipes }
        data-testid="finish-recipe-btn"
        className="finish-recipe-button"
      >
        Finish Recipe

      </Button>
    </div>

  );
}

export default FoodInProgress;
