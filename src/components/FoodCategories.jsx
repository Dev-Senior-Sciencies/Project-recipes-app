import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import MyContext from '../context/MyContext';
import { fetchFoodApi } from '../services/fetchApi';

function FoodCategories() {
  const { foodCategories, setAllFood } = useContext(MyContext);
  const [toggle, setToggle] = useState('');
  const MAX_RENDER = 5;
  if (foodCategories.length > MAX_RENDER) {
    foodCategories.length = 5;
  }

  const selectAllFood = async () => {
    const data = await fetchFoodApi('fetchName', '');
    setAllFood(data.meals);
  };

  const applyCategoryFilter = async ({ target }, category) => {
    if (toggle !== target.name) {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const data = await fetch(url);
      const { meals } = await data.json();
      setAllFood(meals);
      setToggle(target.name);
    } else {
      selectAllFood();
    }
  };

  return (
    <div className="foodCategories-container">
      <div className="container-header-category-button">
        <Button
          className="container-header-category-button-one"
          data-testid="All-category-filter"
          type="button"
          onClick={ selectAllFood }
        >
          All

        </Button>
        {foodCategories.map(({ strCategory }, index) => (
          <div key={ index }>
            <Button
              className="container-header-category-button-one"
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
    </div>
  );
}

export default FoodCategories;
