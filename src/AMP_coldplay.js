import React, { useEffect, useRef, useState } from 'react';
import './AMP_coldplay.css';
import { useNavigate, Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import { artistsData } from './data/artistsData';

function App() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const artist = artistsData.find(a => a.id === 'coldplay');

  const angle = 30;

  function remap(value, oldMax, newMax) {
    const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
    return Math.min(Math.max(newValue, -newMax), newMax);
  }

  useEffect(() => {
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

    const cards = document.querySelectorAll(".AMP_card_coldplay"); // 변경된 클래스명
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

  if (!artist) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '100px' }}>아티스트를 찾을 수 없습니다.</div>;
  }

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play();
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

  return (
    <div className="AMP_Container_coldplay">
      <Header />
      <div className="AMP_card_container_coldplay">
        <div className="AMP_platform_box_1_coldplay">
          <div className="youtube_logo_coldplay" onClick={() => handleLogoClick(artist.platforms.youtube)} title="YouTube"></div>
          <div className="spotify_logo_coldplay" onClick={() => handleLogoClick(artist.platforms.spotify)} title="Spotify"></div>
          <div className="instagram_logo_coldplay" onClick={() => handleLogoClick(artist.platforms.instagram)} title="Instagram"></div>
          <div className="soundcloud_logo_coldplay" onClick={() => handleLogoClick(artist.platforms.soundcloud)} title="SoundCloud"></div>
        </div>

        <div className="AMP_card_coldplay">
          <div className="AMP_shadow_coldplay"></div>
          <div className="AMP_image_coldplay AMP_background_coldplay"></div>
          <div className="AMP_image_coldplay AMP_cutout_coldplay">
            <img src={artist.image} className="AMP_card_img_coldplay" alt={artist.name} />
          </div>

          <div className="AMP_content_coldplay">
            <div className="AMP_card_content_coldplay">
              <div className="AMP_name_coldplay">{artist.name}</div>
              <div className="AMP_hashtag_coldplay">{artist.genre}</div>
              <div className="AMP_like_button_coldplay">
                <div className="AMP_icon_coldplay">♥</div>
                <div className="AMP_count_coldplay">{artist.followers}</div>
              </div>
              <div className="AMP_hashtags_coldplay">
                {artist.hashtags.map((tag, idx) => (
                  <span key={idx} className="AMP_tag_coldplay">{tag}</span>
                ))}
              </div>
              <div className="AMP_intro_coldplay">{artist.description}</div>
            </div>
          </div>
        </div>

        <div className="AMP_player_coldplay">
          <audio ref={audioRef}>
            <source src="/HypeBoy.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="AMP_player_controls_coldplay">
            <button onClick={togglePlay} className="AMP_player_button_coldplay">
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button onClick={resetAudio} className="AMP_player_button_coldplay">⏹</button>
          </div>
        </div>

        <div className="AMP_community_popup_coldplay">
          <h3>아티스트 정보</h3>
          <div className="AMP_community_box_coldplay">
            <p><strong>팔로워:</strong> {artist.followers}</p>
            <p><strong>앨범 수:</strong> {artist.albums}개</p>
          </div>
          <div className="AMP_community_box_coldplay">
            <p><strong>인기 곡:</strong></p>
            <ul className="AMP_songs_list_coldplay">
              {artist.popularSongs.map((song, idx) => (
                <li key={idx}>{song}</li>
              ))}
            </ul>
          </div>
          <div className="AMP_community_box_coldplay">
            <p>{artist.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
