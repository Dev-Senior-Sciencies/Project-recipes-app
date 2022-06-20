import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function DrinkIngredients() {
  const { ingredients, setIngredients, setFilteredDrink,
    setDrink, setGlobalRender } = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
    async function fetchIngredients() {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const response = await fetch(url);
      const data = await response.json();
      setIngredients(data.drinks);
      console.log(data);
    }
    fetchIngredients();
  }, [setIngredients]);

  const MAX_RENDER = 12;
  if (ingredients.length > MAX_RENDER) {
    ingredients.length = 12;
  }

  async function fetchDrinksByIngredient(value) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`;
    const response = await fetch(url);
    const data = await response.json();
    setDrink(data.drinks);
    console.log(data);
  }

  function selectIngredient(event) {
    setFilteredDrink(true);
    setGlobalRender(false);
    fetchDrinksByIngredient(event.target.id);
    console.log(event.target.id);
    history.push('/drinks');
  }

  return (
    <>
      <Header pageName="Explore Ingredients" needRender={ false } />
      <span>Estou em Ingredintes de bebidas</span>
      {ingredients.length > 0
      && ingredients.map((element, index) => (
        <button
          id={ `${element.strIngredient1}` }
          type="button"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ selectIngredient }
        >
          <img
            id={ `${element.strIngredient1}` }
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${element.strIngredient1}-Small.png` }
            alt="ingredient ilustration"
          />
          <p
            id={ `${element.strIngredient1}` }
            data-testid={ `${index}-card-name` }
          >
            {element.strIngredient1}
          </p>
        </button>
      ))}
      <Footer />
    </>
  );
}

export default DrinkIngredients;
