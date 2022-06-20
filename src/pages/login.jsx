import { useHistory } from 'react-router';
import React, { useState } from 'react';
import './login.css';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validate() {
    const re = /\S+@\S+\.\S+/;
    const validEmail = re.test(email);
    const NUMBERSIX = 6;
    if (validEmail && password.length > NUMBERSIX) {
      return false;
    }
    return true;
  }

  function onClickLogin() {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  }

  return (
    <div className="container">
      <div className="container-filho">
        <label htmlFor="email-input">
          <input
            className="email-input"
            data-testid="email-input"
            value={ email }
            type="email"
            id="email-input"
            placeholder="Insira seu email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password-input">
          <input
            className="password-input"
            data-testid="password-input"
            value={ password }
            type="password"
            id="password-input"
            placeholder="Insira sua senha"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <button
          className="login-submit-btn"
          type="button"
          data-testid="login-submit-btn"
          disabled={ validate() }
          onClick={ onClickLogin }
        >
          Login

        </button>
        <div className="scan">
          <div className="fingerprint" />
          <h3>Scanning...</h3>
        </div>
      </div>
    </div>
  );
}
