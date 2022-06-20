export async function fetchFoodApi(verify, value) {
  const verifyEndPoint = {
    fetchIngredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`,
    fetchName: `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`,
    fetchFirstLetter: `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`,
  };
  try {
    const response = await fetch(verifyEndPoint[verify]);
    const data = response.json();
    return data;
  } catch (error) { console.log(error); }
}

export async function fetchDrinkApi(verify, value) {
  const verifyEndPoint = {
    fetchIngredient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`,
    fetchName: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`,
    fetchFirstLetter: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`,
  };
  try {
    const response = await fetch(verifyEndPoint[verify]);
    const data = response.json();
    return data;
  } catch (error) { console.log(error); }
}
