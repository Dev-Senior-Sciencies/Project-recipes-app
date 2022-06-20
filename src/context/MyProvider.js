import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import { fetchFoodApi, fetchDrinkApi } from '../services/fetchApi';

function Provider({ children }) {
  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState([]);
  const [filteredFood, setFilteredFood] = useState(false);
  const [filteredDrink, setFilteredDrink] = useState(false);
  const [allFood, setAllFood] = useState([]);
  const [allDrink, setAllDrink] = useState([]);
  const [globalRender, setGlobalRender] = useState(true);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const value = {
    food,
    setFood,
    drink,
    setDrink,
    filteredFood,
    setFilteredFood,
    filteredDrink,
    setFilteredDrink,
    allFood,
    setAllFood,
    allDrink,
    setAllDrink,
    globalRender,
    setGlobalRender,
    drinkCategories,
    setDrinkCategories,
    foodCategories,
    setFoodCategories,
    ingredients,
    setIngredients,
  };

  useEffect(() => {
    const fetchAllFood = async () => {
      const data = await fetchFoodApi('fetchName', '');
      setAllFood(data.meals);
    };
    fetchAllFood();
  }, []);

  useEffect(() => {
    const fetchAllDrink = async () => {
      const data = await fetchDrinkApi('fetchName', '');
      setAllDrink(data.drinks);
    };
    fetchAllDrink();
  }, []);

  useEffect(() => {
    const fetchDrinkCategories = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const data = await fetch(url);
      const response = await data.json();
      setDrinkCategories(response.drinks);
    };
    fetchDrinkCategories();
  }, []);

  useEffect(() => {
    const fetchFoodCategories = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const data = await fetch(url);
      const response = await data.json();
      setFoodCategories(response.meals);
    };
    fetchFoodCategories();
  }, []);

  return (
    <MyContext.Provider value={ value }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Provider;
