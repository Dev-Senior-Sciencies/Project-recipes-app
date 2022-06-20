import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import MyContext from '../context/MyContext';
import { fetchDrinkApi } from '../services/fetchApi';

function DrinkCategories() {
  const { drinkCategories, setAllDrink } = useContext(MyContext);
  const [toggle, setToggle] = useState('');
  const MAX_RENDER = 5;
  if (drinkCategories.length > MAX_RENDER) {
    drinkCategories.length = 5;
  }

  const selectAllDrink = async () => {
    const data = await fetchDrinkApi('fetchName', '');
    setAllDrink(data.drinks);
  };

  const applyCategoryFilter = async ({ target }, category) => {
    if (toggle !== target.name) {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const data = await fetch(url);
      const { drinks } = await data.json();
      setAllDrink(drinks);
      setToggle(target.name);
    } else {
      selectAllDrink();
    }
  };

  return (
    <div>
      <Button
        data-testid="All-category-filter"
        type="button"
        onClick={ selectAllDrink }
      >
        All
      </Button>

      {drinkCategories.map(({ strCategory }, index) => (
        <div key={ index }>
          <Button
            name={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            onClick={ (event) => applyCategoryFilter(event, strCategory) }
          >
            {strCategory}

          </Button>
        </div>
      ))}
    </div>
  );
}

export default DrinkCategories;
