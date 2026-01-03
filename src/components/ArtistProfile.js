import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import './ArtistProfile.css';

const ArtistProfile = ({ artistId }) => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [artist, setArtist] = useState(null);

  const angle = 30;

  useEffect(() => {
    // 더미 데이터에서 아티스트 찾기
    import('../data/artistsData').then(({ artistsData }) => {
      const foundArtist = artistsData.find(a => a.id === artistId);
      if (foundArtist) {
        setArtist(foundArtist);
      }
    });
  }, [artistId]);

  function remap(value, oldMax, newMax) {
    const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
    return Math.min(Math.max(newValue, -newMax), newMax);
  }

  useEffect(() => {
    if (!artist) return;

    const handleMouseMove = (event) => {
      const e = event.currentTarget;
      if (e instanceof HTMLElement) {
        const rect = e.getBoundingClientRect();
        const centerX = (rect.left + rect.right) / 2;
        const centerY = (rect.top + rect.bottom) / 2;
        const posX = event.pageX - centerX;
        const posY = event.pageY - centerY;
        const x = remap(posX, rect.width / 2, angle);
        const y = remap(posY, rect.height / 2, angle);
        e.style.setProperty("--rotateX", `${y}deg`);
        e.style.setProperty("--rotateY", `${x}deg`);
      }
    };

    const handleMouseOut = (event) => {
      const e = event.currentTarget;
      if (e instanceof HTMLElement) {
        e.style.setProperty("--rotateX", '0deg');
        e.style.setProperty("--rotateY", '0deg');
      }
    };

    const cards = document.querySelectorAll(".AMP_card");
    cards.forEach((card) => {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, [artist]);

  const handleLogoClick = (url) => {
    window.open(url, '_blank');
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play().catch(err => console.log('Audio play failed:', err));
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  const resetAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  if (!artist) {
    return (
      <div className="AMP_Container">
        <Header />
        <div style={{ color: 'white', textAlign: 'center', padding: '100px' }}>
          로딩 중...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="AMP_Container">
      <Header />
      <div className="AMP_content_wrapper">
        <div className="AMP_card_container">
          <div className="AMP_platform_box">
            <div 
              className="platform_logo youtube_logo" 
              onClick={() => handleLogoClick(artist.platforms.youtube)}
              title="YouTube"
            ></div>
            <div 
              className="platform_logo spotify_logo" 
              onClick={() => handleLogoClick(artist.platforms.spotify)}
              title="Spotify"
            ></div>
            <div 
              className="platform_logo instagram_logo" 
              onClick={() => handleLogoClick(artist.platforms.instagram)}
              title="Instagram"
            ></div>
            <div 
              className="platform_logo soundcloud_logo" 
              onClick={() => handleLogoClick(artist.platforms.soundcloud)}
              title="SoundCloud"
            ></div>
          </div>

          <div className="AMP_card">
            <div className="AMP_shadow"></div>
            <div className="AMP_image AMP_background"></div>
            <div className="AMP_image AMP_cutout">
              <img src={artist.image} className="AMP_card_img" alt={artist.name} />
            </div>

            <div className="AMP_content">
              <div className="AMP_card_content">
                <div className="AMP_name">{artist.name}</div>
                <div className="AMP_hashtag">{artist.genre}</div>
                <div className="AMP_like_button">
                  <div className="AMP_icon">♥</div>
                  <div className="AMP_count">{artist.followers}</div>
                </div>
                <div className="AMP_hashtags">
                  {artist.hashtags.map((tag, idx) => (
                    <span key={idx} className="AMP_tag">{tag}</span>
                  ))}
                </div>
                <div className="AMP_intro">{artist.description}</div>
              </div>
            </div>
          </div>

          <div className="AMP_player">
            <audio ref={audioRef}>
              <source src="/HypeBoy.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className="AMP_player_controls">
              <button onClick={togglePlay} className="AMP_player_button">
                {isPlaying ? '❚❚' : '▶'}
              </button>
              <button onClick={resetAudio} className="AMP_player_button">⏹</button>
            </div>
          </div>

          <div className="AMP_community_popup">
            <h3 className="AMP_community_title">아티스트 정보</h3>
            <div className="AMP_community_box">
              <p><strong>팔로워:</strong> {artist.followers}</p>
              <p><strong>앨범 수:</strong> {artist.albums}개</p>
            </div>
            <div className="AMP_community_box">
              <p><strong>인기 곡:</strong></p>
              <ul className="AMP_songs_list">
                {artist.popularSongs.map((song, idx) => (
                  <li key={idx}>{song}</li>
                ))}
              </ul>
            </div>
            <div className="AMP_community_box">
              <p>{artist.description}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArtistProfile;

