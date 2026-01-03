import React, { useEffect, useRef, useState } from 'react';
import './AMP_greenday.css';
import { useNavigate } from "react-router-dom";

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
          <div className="youtube_logo" onClick={() => handleLogoClick('https://www.youtube.com/@GreenDay')}></div>
          <div className="spotify_logo" onClick={() => handleLogoClick('https://open.spotify.com/artist/7oPftvlwr6VrsViSDV7fJY')}></div>
          <div className="instagram_logo" onClick={() => handleLogoClick('https://www.instagram.com/greenday/')}></div>
          <div className="soundcloud_logo" onClick={() => handleLogoClick('https://soundcloud.com/greenday')}></div>
        </div>

        <div className="AMP_card AMP_border_right_behind AMP_border_bottom_behind">
          <div className="AMP_shadow"></div>
          <div className="AMP_image AMP_background"></div>
          <div className="AMP_image AMP_cutout">
            <img src="./greenday.jpg " className="AMP_card_img" alt="Band" />
          </div>

          <div className="AMP_content">
            <div className="AMP_card_content">
              <div className="AMP_name">greenday</div>
              <div className="AMP_hashtag">#Pop-Band</div>
              <div className="AMP_like_button">
                <div className="AMP_icon">♥</div>
                <div className="AMP_count"></div>
              </div>
              <div className="AMP_intro">greenday 밴드입니다.</div>
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

        <div className="AMP_community_popup_greenday">
          <h3>Community Posts</h3>
            <div className="AMP_community_box_greenday">
              그린 데이(Green Day)는 빌리 조 암스트롱, 마이크 던트, 트레 쿨로 구성된 미국 캘리포니아주 출신의 3인조 록 밴드이다. 
              그린 데이는 다른 캘리포니아 밴드인 오프스프링이나 랜시드와 함께 1990년대 미국 내에서 펑크 록을 전파하는 데 큰 공헌을 했다.
              이들은 펑크락밴드인 섬 41, 굿 샬럿, 블링크-182 등에도 영향을 미쳤다.
            </div>  

            <div className="AMP_community_box_greenday">
              1994년 3집 앨범인 《Dookie》로 메이저 레이블에서의 데뷔를 했으며 현재까지 미국에서만 3000만 장 이상의 음반 판매고를 올렸으며, 
              전세계적으로는 6,500만 장 이상의 음반 판매고를 올렸다. 
              또 2006년에 수상한 '올해의 레코드 상'을 포함해 총 5번 그래미 어워드(Grammy Award)를 수상하였으며, 
              VH1에서 선정한 '역사상 가장 위대한 아티스트 100인(100 Greatest Artists of All Time)'에 포함되기도 하였다.
              2015년에는 자격요건이 갖춰지자마자 "로큰롤 명예의 전당"에 헌액되었다.       
            </div>   
                     
        </div>
        
      </div>
    </div>
  );
}

export default App;
