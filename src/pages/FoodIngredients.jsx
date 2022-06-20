import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function FoodIngredients() {
  const { ingredients, setIngredients, setFilteredFood,
    setFood, setGlobalRender } = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
    async function fetchIngredients() {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const response = await fetch(url);
      const data = await response.json();
      setIngredients(data.meals);
      console.log(data);
    }
    fetchIngredients();
  }, [setIngredients]);

  const MAX_RENDER = 12;
  if (ingredients.length > MAX_RENDER) {
    ingredients.length = 12;
  }

  async function fetchFoodsByIngredient(value) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
    const response = await fetch(url);
    const data = await response.json();
    setFood(data.meals);
    console.log(data);
  }

  function selectIngredient(event) {
    setFilteredFood(true);
    setGlobalRender(false);
    fetchFoodsByIngredient(event.target.id);
    history.push('/foods');
  }

  return (
    <>
      <Header pageName="Explore Ingredients" needRender={ false } />
      <div> Estou na Explore Foods Ingredients</div>
      {ingredients.length > 0
      && ingredients.map((element, index) => (
        <button
          type="button"
          key={ index }
          id={ `${element.strIngredient}` }
          data-testid={ `${index}-ingredient-card` }
          onClick={ selectIngredient }
        >
          <img
            id={ `${element.strIngredient}` }
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${element.strIngredient}-Small.png` }
            alt="ingredient ilustration"
          />
          <p
            id={ `${element.strIngredient}` }
            data-testid={ `${index}-card-name` }
          >
            {element.strIngredient}
          </p>
        </button>
      ))}
      <Footer />
    </>
  );
}

export default FoodIngredients;
