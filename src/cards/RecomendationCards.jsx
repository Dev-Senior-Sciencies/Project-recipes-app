import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import './RecomendationCards.css';

function RecomendationCards({ type }) {
  let recomendation = [];
  const { allFood, allDrink } = useContext(MyContext);
  const MAX_LENGTH = 6;

  if (allFood.length > MAX_LENGTH || allDrink.length > MAX_LENGTH) {
    allFood.length = 6;
    allDrink.length = 6;
  }

  if (type === 'drink') {
    recomendation = allFood;
    return (
      <div className="recomendation-card">
        {recomendation.map(({ strCategory, strMealThumb, strMeal }, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ index }
          >
            <img width={ 330 } src={ strMealThumb } alt={ strMeal } />
            <p>
              {strCategory}
            </p>
            <h2 data-testid={ `${index}-recomendation-title` }>{strMeal}</h2>

          </div>

        ))}
      </div>

    );
  }
  recomendation = allDrink;
  return (
    <div className="recomendation-card">
      {recomendation.map(({ strAlcoholic, strDrinkThumb, strDrink }, index) => (
        <div
          data-testid={ `${index}-recomendation-card` }
          key={ index }
        >
          <img width={ 330 } src={ strDrinkThumb } alt={ strDrink } />
          <p>
            {strAlcoholic}
          </p>
          <h2 data-testid={ `${index}-recomendation-title` }>{strDrink}</h2>
        </div>

      ))}

    </div>
  );
}

export default RecomendationCards;

RecomendationCards.propTypes = {
  type: PropTypes.string,
}.isRequired;
