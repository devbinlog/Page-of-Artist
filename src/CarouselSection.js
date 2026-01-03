// src/components/CarouselSection.js
import React, { useState } from 'react';
import Carousel from './Carousel';
import './CarouselSection.css';
import Header from './Header';
import Footer from './Footer';
import { artistsData } from './data/artistsData';

const CarouselSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('전체');
  
  // 고유 장르 목록 추출
  const genres = ['전체', ...new Set(artistsData.map(artist => artist.genre))];

  return (
    <div className="carousel-page-container">
      <Header />
      <div className="carousel-page-content">
        <div className="carousel-page-header">
          <h1 className="carousel-page-title">아티스트 탐색</h1>
          <p className="carousel-page-subtitle">3D 캐러셀로 다양한 아티스트를 탐색해보세요</p>
          
          {/* 검색 및 필터 섹션 */}
          <div className="carousel-filters">
            <div className="search-box">
              <input
                type="text"
                placeholder="아티스트 이름으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            
            <div className="genre-filter">
              <label>장르 필터:</label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="genre-select"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <Carousel searchTerm={searchTerm} selectedGenre={selectedGenre} />
        
        {/* 아티스트 정보 섹션 */}
        <div className="artists-info-section">
          <h2 className="artists-info-title">전체 아티스트</h2>
          <div className="artists-grid">
            {artistsData
              .filter(artist => 
                (selectedGenre === '전체' || artist.genre === selectedGenre) &&
                artist.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((artist) => (
                <div key={artist.id} className="artist-info-card">
                  <img src={artist.image} alt={artist.name} className="artist-info-image" />
                  <div className="artist-info-content">
                    <h3 className="artist-info-name">{artist.name}</h3>
                    <p className="artist-info-genre">{artist.genre}</p>
                    <div className="artist-info-tags">
                      {artist.hashtags.map((tag, idx) => (
                        <span key={idx} className="artist-info-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarouselSection;
