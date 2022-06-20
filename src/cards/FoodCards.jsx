import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';

function FoodCards() {
  const { allFood } = useContext(MyContext);

  const MAX_RENDER = 12;
  if (allFood.length > MAX_RENDER) {
    allFood.length = 12;
  }

  return (
    <div className="container-main-img">
      {allFood.map(({ strMealThumb, strMeal, idMeal }, index) => (
        <Link key={ index } to={ `/foods/${idMeal}` }>
          <div
            className="container-main-img-one-full"
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              className="container-main-img-one"
              width={ 300 }
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt={ `Imagem da receita ${strMeal}` }
            />
            <p
              className="container-main-img-name"
              data-testid={ `${index}-card-name` }
            >
              {strMeal}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default FoodCards;
