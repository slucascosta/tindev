import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import api from '../services/api';
import UserCard from './UserCard';

import './Main.css';
import logo from '../assets/logo.svg';
import istsamatch from '../assets/itsamatch.png';

export default function Main({ match, location }) {
  const [ users, setUsers ] = useState([]);
  const [ username, setUsername ] = useState('');
  const [ matchDev, setMatchDev ] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      const users = await api.getUsers(match.params.id);
      setUsers(users);
    }

    loadUsers();
  }, [match.params.id]);

  useEffect(() => {
    async function loadUser() {
      if (location.state && location.state.user)
        setUsername(location.state.user.user);
      else {
        const user = await api.getUser(match.params.id)
        setUsername(user.user);
      }
    }

    loadUser();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: match.params.id }
    });

    socket.on('match', dev => {
      setMatchDev(dev);
    });
  }, [match.params.id]);

  async function handleLike(id) {
    await api.like(match.params.id, id);
    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    await api.dislike(match.params.id, id);
    setUsers(users.filter(user => user._id !== id));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      { username && 
        <p>
          <a className="username" href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">{`@${username}`}</a>
        </p>
      }
      { users.length ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <UserCard
                user={user}
                onLike={() => handleLike(user._id)}
                onDislike={() => handleDislike(user._id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :(</div>
      ) }

      { matchDev && (
        <div className="match-container">
          <img src={istsamatch} alt="It`s a match" />
          <img className="avatar" src={matchDev.avatar} alt={matchDev.name} />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>
          <button type="button" onClick={() => setMatchDev(null)}>FECHAR</button>
        </div>
      ) }
    </div>
  );
}