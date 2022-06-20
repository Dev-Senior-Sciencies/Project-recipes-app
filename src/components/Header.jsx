import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import seartchIcon from '../images/searchIcon.svg';
import '../pages/foods.css';
import SearchBar from './SearchBar';

function Header({ pageName, needRender, type }) {
  const history = useHistory();
  const [activateSearch, setActivateSearch] = useState(false);

  const profileRedirect = () => {
    history.push('/profile');
  };

  return (
    <header>
      <div className="container-header-input">
        <div className="container-header-input-images">
          <input
            type="image"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="icone de perfil"
            onClick={ profileRedirect }
          />
          { needRender
            && <input
              type="image"
              data-testid="search-top-btn"
              src={ seartchIcon }
              alt="botão para pesquisar"
              onClick={ () => setActivateSearch(!activateSearch) }
            />}
        </div>
        <div className="container-header-input-Search">
          {activateSearch
           && <SearchBar type={ type } />}
        </div>
      </div>
      <h1
        className="header-h1"
        data-testid="page-title"
      >
        { pageName }
      </h1>
    </header>
  );
}

export default Header;

Header.propTypes = {
  needRender: PropTypes.bool,
}.isRequired;
