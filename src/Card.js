import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({ userData }) => {
  const navigate = useNavigate();
  const { imageUrl, name, hashtags, profileLink, likes } = userData;

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (profileLink) {
      navigate(profileLink);
    }
  };

  return (
    <div className="main-artist-card">
      <div className="main-artist-card-front">
        <img src={imageUrl} alt={`${name} 프로필`} className="main-artist-card-image" />
        <div className="main-artist-card-info">
          <div className="main-artist-card-user-info">
            <span className="main-artist-card-user-name">{name}</span>
            {likes && (
              <div className="main-artist-card-likes-info">
                <span className="main-artist-card-heart-icon">♥</span>
                <span className="main-artist-card-likes-count">{likes.toLocaleString()}</span>
              </div>
            )}
          </div>
          <div className="main-artist-card-hashtags">
            {hashtags && hashtags.slice(0, 4).map((tag, index) => (
              <span key={index} className="main-artist-card-hashtag">{tag}</span>
            ))}
          </div>
          <button 
            className="main-artist-card-profile-link" 
            onClick={handleProfileClick}
          >
            프로필 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
