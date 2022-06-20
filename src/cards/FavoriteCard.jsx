import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteCard({ recipe }) {
  const [linkCopied, setLinkCopied] = useState(false);
  return (
    <div>
      {recipe.map((element, index) => {
        if (element.type === 'food') {
          const removeFromFavorite = () => {
            const newList = recipe.filter((item) => item.id !== element.id);
            localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
            window.location.reload();
          };
          const copyToClipboard = async () => {
            await navigator.clipboard.writeText(`http://localhost:3000/foods/${element.id}`);
            setLinkCopied(true);
          };
          return (
            <div key={ index }>
              <Link to={ `foods/${element.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  width={ 100 }
                  src={ element.image }
                  alt={ element.name }
                />
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${element.nationality} - ${element.category}`}
              </p>
              <Link to={ `foods/${element.id}` }>
                <h3
                  data-testid={ `${index}-horizontal-name` }
                >
                  {element.name}

                </h3>
              </Link>
              {linkCopied ? 'Link copied!' : ''}
              <input
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ copyToClipboard }
                type="image"
                src={ ShareIcon }
                alt="ícone de compartilhamento"
              />
              <input
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ removeFromFavorite }
                type="image"
                src={ BlackHeartIcon }
                alt="iconde de coração preenchido"
              />
            </div>);
        }
        const removeFromFavorite = () => {
          const newListDrink = recipe.filter((item) => item.id !== element.id);
          localStorage.setItem('favoriteRecipes', JSON.stringify(newListDrink));
          window.location.reload();
        };
        const copyToClipboard = async () => {
          await navigator.clipboard.writeText(`http://localhost:3000/drinks/${element.id}`);
        };
        return (
          <div key={ index }>
            <Link to={ `drinks/${element.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                width={ 100 }
                src={ element.image }
                alt={ element.name }
              />
            </Link>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${element.alcoholicOrNot}`}
            </p>
            <Link to={ `drinks/${element.id}` }>

              <h3
                data-testid={ `${index}-horizontal-name` }
              >
                {element.name}
              </h3>
            </Link>
            <input
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ copyToClipboard }
              type="image"
              src={ ShareIcon }
              alt="ícone de compartilhamento"
            />
            <input
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ removeFromFavorite }
              type="image"
              src={ BlackHeartIcon }
              alt="iconde de coração preenchido"
            />
          </div>
        );
      })}
    </div>
  );
}

export default FavoriteCard;
FavoriteCard.propTypes = {
  needRender: PropTypes.bool,
}.isRequired;
