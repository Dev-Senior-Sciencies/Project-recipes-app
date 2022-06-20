import React, { useContext } from 'react';
import FoodCards from '../cards/FoodCards';
import FoodCategories from '../components/FoodCategories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import './foods.css';

function Foods() {
  const { filteredFood, food, globalRender } = useContext(MyContext);
  if (food === null) {
    return (
      <div className="Header-container">
        <Header className="Header" pageName="Foods" needRender type="food" />
        <div>Receita não encontrada</div>
      </div>
    );
  }

  const MAX_RENDER = 12;
  if (food.length > MAX_RENDER) {
    food.length = 12;
  }
  return (
    <div className="container-masterFood">
      <div className="container-main">
        <div className="container-header-category">
          <div className="container-header">
            <Header pageName="Foods" needRender type="food" />
            <FoodCategories />
          </div>
          <div>
            {filteredFood
              && food.map((element, index) => (
                <div key={ index } data-testid={ `${index}-recipe-card` }>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ element.strMealThumb }
                    alt="food ilustration"
                  />
                  <p data-testid={ `${index}-card-name` }>
                    {element.strMeal}
                  </p>
                </div>
              ))}
          </div>
          {
            globalRender
          && (
            <FoodCards />
          )
          }
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Foods;
