import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './footer.css';

function Footer() {
  const history = useHistory();

  const drinksRedirect = () => {
    history.push('/drinks');
  };

  const exploreRedirect = () => {
    history.push('/explore');
  };

  const foodRedirect = () => {
    history.push('/foods');
  };

  return (
    <footer data-testid="footer" className="footer">
      <input
        data-testid="drinks-bottom-btn"
        type="image"
        src={ drinkIcon }
        alt="ícone de bebida"
        onClick={ drinksRedirect }
      />
      <input
        data-testid="explore-bottom-btn"
        type="image"
        src={ exploreIcon }
        alt="ícone de bebida"
        onClick={ exploreRedirect }
      />
      <input
        data-testid="food-bottom-btn"
        type="image"
        src={ mealIcon }
        alt="ícone de comida"
        onClick={ foodRedirect }
      />
    </footer>
  );
}

export default Footer;
