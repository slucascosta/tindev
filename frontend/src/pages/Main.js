import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../services/api';
import UserCard from './UserCard';

import './Main.css';
import logo from '../assets/logo.svg';

export default function Main({ match }) {
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const users = await api.getUsers(match.params.id);
      setUsers(users);
    }

    loadUsers();
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
    </div>
  );
}