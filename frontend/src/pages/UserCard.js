import React from 'react';

import './UserCard.css';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

export default function UserCard({ user, onLike, onDislike }) {
  return (
    <div className="user-card-container">
      <img src={user.avatar} alt={user.name} />
      <footer>
        {user.name && <strong>{user.name}</strong>}
        <a href={`https://github.com/${user.user}`} target="_blank" rel="noopener noreferrer">{`@${user.user}`}</a>
        <p>{user.bio}</p>
      </footer>
      <div className="buttons">
        <button type="buttton" onClick={onDislike}>
        <img src={dislike} alt="Dislike"/>
        </button>
        <button type="buttton" onClick={onLike}>
          <img src={like} alt="Like"/>
        </button>
      </div>
    </div>
  );
}