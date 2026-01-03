import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import './Carousel.css';
import { artistsData } from './data/artistsData';

const Carousel = ({ searchTerm = '', selectedGenre = '전체' }) => {
  const [active, setActive] = useState(2);
  const [cardData, setCardData] = useState([]);
  const rightButtonRef = useRef(null);

  useEffect(() => {
    // 더미 데이터를 필터링하고 카드 형식으로 변환
    const filteredArtists = artistsData.filter(artist => {
      const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === '전체' || artist.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });

    const formattedData = filteredArtists.map((artist) => ({
      imageUrl: artist.image,
      name: artist.name,
      likes: Math.floor(Math.random() * 5000) + 1000,
      hashtags: artist.hashtags,
      profileLink: `/amp_${artist.id}`,
      genre: artist.genre
    }));
    
    setCardData(formattedData);
    // 필터 변경 시 active 인덱스 리셋
    if (formattedData.length > 0) {
      setActive(Math.min(2, Math.floor(formattedData.length / 2)));
    }
  }, [searchTerm, selectedGenre]);

  const handleLeftClick = () => {
    setActive((prevActive) => (prevActive - 1 + cardData.length) % cardData.length);
  };

  const handleRightClick = () => {
    setActive((prevActive) => (prevActive + 1) % cardData.length);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (rightButtonRef.current) {
          rightButtonRef.current.click();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (cardData.length === 0) {
    return (
      <div className="carousel-empty-state">
        <p>조건에 맞는 아티스트가 없습니다.</p>
        <p className="carousel-empty-hint">다른 검색어나 장르를 선택해보세요.</p>
      </div>
    );
  }

  return (
    <div className="main-artist-card-carousel">
      <button className="main-artist-card-nav main-artist-card-left" onClick={handleLeftClick}>
        <p>←</p>
      </button>
      {cardData.map((userData, i) => {
        const offset = (i - active + cardData.length) % cardData.length - Math.floor(cardData.length / 2);
        const direction = Math.sign(offset);
        const absOffset = Math.abs(offset) / 3;
        const pointerEvents = active === i ? 'auto' : 'none';
        const opacity = Math.abs(offset) >= 3 ? '0' : '1';
        const display = Math.abs(offset) > 3 ? 'none' : 'flex';

        return (
          <div
            key={i}
            className="main-artist-card-container"
            style={{
              '--offset': offset,
              '--direction': direction,
              '--abs-offset': absOffset,
              pointerEvents,
              opacity,
              display
            }}
          >
            <Card userData={userData} />
          </div>
        );
      })}
      <button
        className="main-artist-card-nav main-artist-card-right"
        onClick={handleRightClick}
        ref={rightButtonRef}
      >
        <p>→</p>
      </button>
    </div>
  );
};

export default Carousel;
