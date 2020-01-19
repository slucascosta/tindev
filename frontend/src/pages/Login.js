import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';
import logo from '../assets/logo.svg';

export default function Login({ history }) {
  const [ username, setUsername ] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    
    var id = await api.login(username);

    history.push(`/dev/${id}`);
  }

  return (
    <div className="login-container" >
      <form onSubmit={handleSubmit}>
        <img src={ logo } alt="tindev" />
        <input
          placeholder="Digite seu usuário no Github"
          value={username}
          onChange={e => setUsername(e.target.value) }
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}