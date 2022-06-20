import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

function ShareAndFavDrink({ actualFood: food }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const isFavorited = () => {
    const { idDrink: id,
      strCategory: category,
      strAlcoholic: alcoholicOrNot,
      strDrink: name, strDrinkThumb: image } = food[0];
    const actualState = { id,
      type: 'drink',
      nationality: '',
      alcoholicOrNot,
      category,
      name,
      image };
    const recipeListOne = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipeListOne) {
      if (recipeListOne.find((elemento) => elemento
        .id === actualState.id) !== undefined) {
        setIsFavorite(true);
      }
    } else {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    isFavorited();
  }, []);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(`${window.location}`.split('/in-progress')[0]);
    setLinkCopied(true);
  };
  const addToFavoriteRecipeState = () => {
    const { idDrink: id,
      strCategory: category,
      strAlcoholic: alcoholicOrNot,
      strDrink: name, strDrinkThumb: image } = food[0];
    const actualState = { id,
      type: 'drink',
      nationality: '',
      alcoholicOrNot,
      category,
      name,
      image };
    const recipeList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let newList = [];
    if (recipeList) {
      newList = recipeList.find((item) => item.id === actualState.id)
        ? recipeList.filter((item) => item.id !== actualState.id)
        : [...recipeList, actualState];
    } else {
      newList = [actualState];
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));

    setIsFavorite(!isFavorite);
  };
  return (
    <div>

      {linkCopied ? 'Link copied!'
        : (
          <input
            onClick={ copyToClipboard }
            data-testid="share-btn"
            type="image"
            src={ ShareIcon }
            alt="ícone de compartilhamento"
          />)}
      <input
        onClick={ addToFavoriteRecipeState }
        data-testid="favorite-btn"
        type="image"
        src={ isFavorite ? BlackHeartIcon : WhiteHeartIcon }
        alt="ícone de coração para favoritar"
      />
    </div>
  );
}

export default ShareAndFavDrink;

ShareAndFavDrink.propTypes = {
  recipeContent: PropTypes.string,
}.isRequired;
