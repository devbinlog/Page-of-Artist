import React, { useEffect, useRef, useState } from 'react';
import './ArtistMyPage.css';

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
  }, []);

  const handleLogoClick = (url) => {
    window.location.href = url;
  };

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
    <div className="AMP_Container">
      <div className="AMP_header">
        <div className="AMP_main_logo_container">
          <img src="" className="AMP_logoimg" alt="Logo" />
        </div>

        <div className="AMP_nav">
          <ul className="AMP_ul1">
            <li className="AMP_li"><a href="#">|</a></li>
            <li className="AMP_li"><a href="#">My Page</a></li>
          </ul>
        </div>
      </div>

      <div className="AMP_card_container">
        <div className="AMP_platform_box_1">
          <div className="youtube_logo" onClick={() => handleLogoClick('https://www.youtube.com')}></div>
          <div className="spotify_logo" onClick={() => handleLogoClick('https://www.spotify.com')}></div>
          <div className="instagram_logo" onClick={() => handleLogoClick('https://www.instagram.com')}></div>
          <div className="soundcloud_logo" onClick={() => handleLogoClick('https://soundcloud.com')}></div>
        </div>

        <div className="AMP_card AMP_border_right_behind AMP_border_bottom_behind">
          <div className="AMP_shadow"></div>
          <div className="AMP_image AMP_background"></div>
          <div className="AMP_image AMP_cutout">
            <img src="./" className="AMP_card_img" alt="Band" />
          </div>

          <div className="AMP_content">
            <div className="AMP_card_content">
              <div className="AMP_name">LANY</div>
              <div className="AMP_hashtag">#Pop-Band</div>
              <div className="AMP_like_button">
                <div className="AMP_icon">♥</div>
                <div className="AMP_count">100k</div>
              </div>
              <div className="AMP_intro">LANY 밴드입니다.</div>
            </div>
          </div>
        </div>

        <div className="AMP_player">
          <audio ref={audioRef}>
            <source src="HypeBoy.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="AMP_player_controls">
            <button onClick={togglePlay} className="AMP_player_button">
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button onClick={resetAudio} className="AMP_player_button">⏹</button>
          </div>
        </div>

        <div className="AMP_community_icon">커뮤니티 아이콘</div>
      </div>
    </div>
  );
}

export default App;
