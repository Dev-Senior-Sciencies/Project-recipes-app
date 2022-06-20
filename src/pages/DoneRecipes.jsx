import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  return (
    <>
      <Header pageName="Done Recipes" needRender={ false } />
      <span>Estou em receitas feitas</span>
    </>
  );
}

export default DoneRecipes;
