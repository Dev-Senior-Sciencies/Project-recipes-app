import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';

function DrinkCards() {
  const { allDrink } = useContext(MyContext);

  const MAX_RENDER = 12;
  if (allDrink.length > MAX_RENDER) {
    allDrink.length = 12;
  }

  return (
    <div>
      {allDrink.map(({ strDrinkThumb, strDrink, idDrink }, index) => (
        <Link key={ index } to={ `/drinks/${idDrink}` }>
          <div
            data-testid={ `${index}-recipe-card` }
          >
            <img
              width={ 300 }
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt={ `Imagem da receita ${strDrink}` }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              {strDrink}
            </p>
          </div>
        </Link>

      ))}
    </div>
  );
}

export default DrinkCards;
