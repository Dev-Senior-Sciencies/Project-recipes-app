import React, { useContext } from 'react';
import DrinkCards from '../cards/DrinkCard';
import DrinkCategories from '../components/DrinkCategories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function Drinks() {
  const { filteredDrink, drink, globalRender } = useContext(MyContext);
  if (drink === null) {
    return (
      <div>
        <Header pageName="Drinks" needRender type="drink" />
        <div>Receita não encontrada</div>
      </div>
    );
  }
  const MAX_RENDER = 12;
  if (drink.length > MAX_RENDER) {
    drink.length = 12;
  }

  return (
    <>
      <Header pageName="Drinks" needRender type="drink" />
      <DrinkCategories />
      {filteredDrink
      && drink.map((element, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ element.strDrinkThumb }
            alt="food ilustration"
          />
          <p data-testid={ `${index}-card-name` }>
            {element.strDrink}
          </p>
        </div>
      ))}
      {globalRender
      && <DrinkCards />}
      <Footer />
    </>
  );
}

export default Drinks;
