import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function ExploreDrinks() {
  const history = useHistory();
  const { setDrink } = useContext(MyContext);

  async function getSurpriseDrink() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setDrink(data.drinks);
    return history.push(`/drinks/${data.drinks[0].idDrink}`);
  }

  return (
    <div>
      <Header pageName="Explore Drinks" needRender={ false } />
      <div> Estou na Explore Drinks</div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ getSurpriseDrink }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
