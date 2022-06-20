import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const emailProfile = JSON.parse(localStorage.getItem('user'));

  const history = useHistory();

  return (
    <>
      <Header pageName="Profile" needRender={ false } />
      <p data-testid="profile-email">
        {emailProfile && emailProfile.email}
      </p>
      <Button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </Button>

      <Button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </Button>

      <Button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => { localStorage.clear(); history.push('/'); } }
      >
        Logout
      </Button>
      <Footer />
    </>
  );
}
