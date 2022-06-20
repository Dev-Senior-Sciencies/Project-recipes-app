import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function ExploreFoods() {
  const history = useHistory();
  const { setFood } = useContext(MyContext);

  async function getSurpriseFood() {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setFood(data.meals);
    return history.push(`/foods/${data.meals[0].idMeal}`);
  }

  return (
    <div>
      <Header pageName="Explore Foods" needRender={ false } />
      <div> Estou na Explore Foods</div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ getSurpriseFood }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
