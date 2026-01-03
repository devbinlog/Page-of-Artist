import React, { useEffect, useRef, useState } from 'react';
import './AMP_5sos.css'; // 변경된 CSS 파일 경로
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

    const cards = document.querySelectorAll(".AMP_card_5sos"); // 변경된 클래스명
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
    <div className="AMP_Container_5sos"> {/* 변경된 클래스명 */}
      <div className="AMP_header_5sos"> {/* 변경된 클래스명 */}
        <div className="AMP_main_logo_container_5sos"> {/* 변경된 클래스명 */}
       
        </div>

        <div className="AMP_nav_5sos"> {/* 변경된 클래스명 */}
          <ul className="AMP_ul1_5sos"> {/* 변경된 클래스명 */}
            <li className="AMP_li_5sos"><a href="#">|</a></li> {/* 변경된 클래스명 */}
            <li className="AMP_li_5sos"><a href="#">My Page</a></li> {/* 변경된 클래스명 */}
          </ul>
        </div>
      </div>

      <div className="AMP_card_container_5sos"> {/* 변경된 클래스명 */}
        <div className="AMP_platform_box_1_5sos"> {/* 변경된 클래스명 */}
          <div className="youtube_logo_5sos" onClick={() => handleLogoClick('https://www.youtube.com/@5SOS')}></div> {/* 변경된 클래스명 */}
          <div className="spotify_logo_5sos" onClick={() => handleLogoClick('https://open.spotify.com/artist/5Rl15oVamLq7FbSb0NNBNy')}></div> {/* 변경된 클래스명 */}
          <div className="instagram_logo_5sos" onClick={() => handleLogoClick('https://www.instagram.com/5sos/')}></div> {/* 변경된 클래스명 */}
          <div className="soundcloud_logo_5sos" onClick={() => handleLogoClick('https://soundcloud.com/5-seconds-of-summer')}></div> {/* 변경된 클래스명 */}
        </div>

        <div className="AMP_card_5sos AMP_border_right_behind_5sos AMP_border_bottom_behind_5sos"> {/* 변경된 클래스명 */}
          <div className="AMP_shadow_5sos"></div> {/* 변경된 클래스명 */}
          <div className="AMP_image_5sos AMP_background_5sos"></div> {/* 변경된 클래스명 */}
          <div className="AMP_image_5sos AMP_cutout_5sos">
            <img src="./5sos.jpg" className="AMP_card_img_5sos" alt="Band" /> {/* 변경된 클래스명 */}
          </div>

          <div className="AMP_content_5sos"> {/* 변경된 클래스명 */}
            <div className="AMP_card_content_5sos"> {/* 변경된 클래스명 */}
              <div className="AMP_name_5sos">5 seconds of summers</div> {/* 변경된 클래스명 */}
              <div className="AMP_hashtag_5sos">#Pop-Band</div> {/* 변경된 클래스명 */}
              <div className="AMP_like_button_5sos"> {/* 변경된 클래스명 */}
                <div className="AMP_icon_5sos">♥</div> {/* 변경된 클래스명 */}
                <div className="AMP_count_5sos"></div> {/* 변경된 클래스명 */}
              </div>
              <div className="AMP_intro_5sos">5sos 밴드입니다.</div> {/* 변경된 클래스명 */}
            </div>
          </div>
        </div>

        <div className="AMP_player_5sos"> {/* 변경된 클래스명 */}
          <audio ref={audioRef}>
            <source src="HypeBoy.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="AMP_player_controls_5sos"> {/* 변경된 클래스명 */}
            <button onClick={togglePlay} className="AMP_player_button_5sos">
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button onClick={resetAudio} className="AMP_player_button_5sos">⏹</button>
          </div>
        </div>

        <div className="AMP_community_popup_5sos">
          <h3>Community Posts</h3>
            <div className="AMP_community_box_5sos">
              파이브 세컨즈 오브 서머(5 Seconds of Summer, 이하 5SOS)는
              리드 보컬 루크 헤밍스(Luke Hemmings), 기타 마이클 클리포드(Michael Clifford), 베이스 캘럼 후드(Calum Hood) 
              그리고 드럼 애쉬턴 어윈(Ashton Irwin) 등 네 명으로 이루어져 있는
              호주의 팝 록 밴드이다. 
            </div>  

            <div className="AMP_community_box_5sos">
             5 Seconds of Summer (이하 5SOS)는 2011년 결성된 오스트레일리아, 시드니의 팝펑크 밴드이다.
             McFly, blink-182, Green Day, Boys Like Girls 외 많은 밴드들의 영향을 받은 것으로 알려져 있다.
            </div>  
            
                     
        </div>

      </div>
    </div>
  );
}

export default App;
