import React, { useEffect, useRef, useState } from 'react';
import './AMP_coldplay.css'; // 변경된 CSS 파일 경로
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
    <div className="AMP_Container_coldplay"> {/* 변경된 클래스명 */}
      <div className="AMP_header_coldplay"> {/* 변경된 클래스명 */}
        <div className="AMP_main_logo_container_coldplay"> {/* 변경된 클래스명 */}
        
        </div>

        <div className="AMP_nav_coldplay"> {/* 변경된 클래스명 */}
          <ul className="AMP_ul1_coldplay"> {/* 변경된 클래스명 */}
            <li className="AMP_li_coldplay"><a href="#">|</a></li> {/* 변경된 클래스명 */}
            <li className="AMP_li_coldplay"><a href="#">My Page</a></li> {/* 변경된 클래스명 */}
          </ul>
        </div>
      </div>

      <div className="AMP_card_container_coldplay"> {/* 변경된 클래스명 */}
        <div className="AMP_platform_box_1_coldplay"> {/* 변경된 클래스명 */}
          <div className="youtube_logo_coldplay" onClick={() => handleLogoClick('https://www.youtube.com/@coldplay')}></div> {/* 변경된 클래스명 */}
          <div className="spotify_logo_coldplay" onClick={() => handleLogoClick('https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU')}></div> {/* 변경된 클래스명 */}
          <div className="instagram_logo_coldplay" onClick={() => handleLogoClick('https://www.instagram.com/coldplay/')}></div> {/* 변경된 클래스명 */}
          <div className="soundcloud_logo_coldplay" onClick={() => handleLogoClick('https://soundcloud.com/coldplay ')}></div> {/* 변경된 클래스명 */}
        </div>

        <div className="AMP_card_coldplay AMP_border_right_behind_coldplay AMP_border_bottom_behind_coldplay"> {/* 변경된 클래스명 */}
          <div className="AMP_shadow_coldplay"></div> {/* 변경된 클래스명 */}
          <div className="AMP_image_coldplay AMP_background_coldplay"></div> {/* 변경된 클래스명 */}
          <div className="AMP_image_coldplay AMP_cutout_coldplay">
            <img src="./coldplay.jpg" className="AMP_card_img_coldplay" alt="Band" /> {/* 변경된 클래스명 */}
          </div>

          <div className="AMP_content_coldplay"> {/* 변경된 클래스명 */}
            <div className="AMP_card_content_coldplay"> {/* 변경된 클래스명 */}
              <div className="AMP_name_coldplay">coldplay</div> {/* 변경된 클래스명 */}
              <div className="AMP_hashtag_coldplay">#Pop-Band</div> {/* 변경된 클래스명 */}
              <div className="AMP_like_button_coldplay"> {/* 변경된 클래스명 */}
                <div className="AMP_icon_coldplay">♥</div> {/* 변경된 클래스명 */}
                <div className="AMP_count_coldplay"></div> {/* 변경된 클래스명 */}
              </div>
              <div className="AMP_intro_coldplay">coldplay 밴드입니다.</div> {/* 변경된 클래스명 */}
            </div>
          </div>
        </div>

        <div className="AMP_player_coldplay"> {/* 변경된 클래스명 */}
          <audio ref={audioRef}>
            <source src="HypeBoy.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="AMP_player_controls_coldplay"> {/* 변경된 클래스명 */}
            <button onClick={togglePlay} className="AMP_player_button_coldplay">
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button onClick={resetAudio} className="AMP_player_button_coldplay">⏹</button>
          </div>
        </div>

        <div className="AMP_community_popup_coldplay">
          <h3>Community Posts</h3>
            <div className="AMP_community_box_coldplay">
              콜드플레이(영어: Coldplay)는 1996년 영국 런던 UCL에서 결성된 얼터너티브 록 밴드이다. 
              밴드의 멤버는 그룹의 보컬이자 피아니스트, 기타리스트인 크리스 마틴, 
              리드 기타리스트 조니 버클랜드, 베이스 가이 베리먼, 그리고 드러머와 기타 악기 연주를 맡은 윌 챔피언이다. 
            </div>  

            <div className="AMP_community_box_coldplay">
              1997년 영국 런던에서 결성된 얼터너티브 록밴드로, 
              오아시스의 몰락과 라디오헤드의 음악적 고립으로 침체된 브리티시 록 음악 장르의 대안으로 떠오른 록밴드이다. 
              초기엔 트래비스와 라디오헤드가 보여준 음악과 비슷하였지만 갈수록 자신들만의 스타일을 확립시켜나가
              평단과 대중의 호평을 동시에 받았던 몇안되는 밴드였다. 또한 2000년대 상업적으로 가장 성공한 밴드로 꼽힌다.          
            </div>           
                     
        </div>
        
      </div>
    </div>
  );
}

export default App;
