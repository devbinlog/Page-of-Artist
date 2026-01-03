import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import './Carousel.css';
import axios from 'axios';

const CARDS = 10;
const MAX_VISIBILITY = 3;

const Carousel = () => {
  const [active, setActive] = useState(2);
  const [cardData, setCardData] = useState([]);
  const rightButtonRef = useRef(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://ec2-52-78-200-139.ap-northeast-2.compute.amazonaws.com:8080/api/files/artists');
        const artistNames = response.data;
        const artistData = await Promise.all(artistNames.map(async (artistName) => {
          const imageResponse = await axios.get(`http://ec2-52-78-200-139.ap-northeast-2.compute.amazonaws.com:8080/${artistName}/images`);
          const images = imageResponse.data;
          return {
            imageUrl: images.length > 0 ? images[0] : '', // 이미지가 없을 경우 빈 문자열
            name: artistName,
            likes: Math.floor(Math.random() * 1000),
            hashtags: ['#Pop', '#Band', '#Funk', '#Rock', '#Alternative'],
            profileLink: `/AMP_${artistName}`
          };
        }));
        setCardData(artistData);
      } catch (error) {
        console.error('Error fetching artist data:', error);
      }
    };

    fetchArtists();
  }, []);

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
        const opacity = Math.abs(offset) >= MAX_VISIBILITY ? '0' : '1';
        const display = Math.abs(offset) > MAX_VISIBILITY ? 'none' : 'flex';

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
            <Card userData={userData} /> {/* Card 컴포넌트에 userData 전달 */}
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
