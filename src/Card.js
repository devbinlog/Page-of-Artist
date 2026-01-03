import React from 'react';
import './Card.css';

const Card = ({ userData }) => {
  const { imageUrl, name, hashtags, profileLink } = userData;

  const handleProfileClick = (event) => {
    event.preventDefault(); // 기본 동작(새 창 열기) 방지
    window.location.href = profileLink; // 현재 창에서 프로필 링크로 이동
  };

  return (
    <div className="main-artist-card">
      <div className="main-artist-card-front">
        <img src={imageUrl} alt="Card Image" className="main-artist-card-image" />
        <div className="main-artist-card-info">
          <div className="main-artist-card-user-info">
            <span className="main-artist-card-user-name">{name}</span>
            <br />
            <span className="main-artist-card-heart-icon">&#10084;</span>
          </div>
          <div className="main-artist-card-hashtags">
            {hashtags.map((tag, index) => (
              <span key={index} className="main-artist-card-hashtag">{tag}</span>
            ))}
          </div>
          <a href={profileLink} className="main-artist-card-profile-link" onClick={handleProfileClick}>
            프로필 보기
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
