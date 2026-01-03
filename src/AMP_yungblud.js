import React, { useEffect, useRef, useState } from 'react';
import './AMP_yungblud.css'; // CSS 파일 이름도 변경해야 합니다.
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

    const cards = document.querySelectorAll(".AMP_card_yungblud");
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
    <div className="AMP_Container_yungblud">
      <div className="AMP_header_yungblud">
        <div className="AMP_main_logo_container_yungblud">

        </div>

        <div className="AMP_nav_yungblud">
          <ul className="AMP_ul1_yungblud">
            <li className="AMP_li_yungblud"><a href="#">|</a></li>
            <li className="AMP_li_yungblud"><a href="#">My Page</a></li>
          </ul>
        </div>
      </div>

      <div className="AMP_card_container_yungblud">
        <div className="AMP_platform_box_1_yungblud">
          <div className="youtube_logo_yungblud" onClick={() => handleLogoClick('https://www.youtube.com/@yungblud')}></div>
          <div className="spotify_logo_yungblud" onClick={() => handleLogoClick('https://open.spotify.com/artist/6s22t5Y3prQHyaHWUN1R1C')}></div>
          <div className="instagram_logo_yungblud" onClick={() => handleLogoClick('https://www.instagram.com/yungblud/')}></div>
          <div className="soundcloud_logo_yungblud" onClick={() => handleLogoClick('https://soundcloud.com/yungblud')}></div>
        </div>

        <div className="AMP_card_yungblud AMP_border_right_behind_yungblud AMP_border_bottom_behind_yungblud">
          <div className="AMP_shadow_yungblud"></div>
          <div className="AMP_image_yungblud AMP_background_yungblud"></div>
          <div className="AMP_image_yungblud AMP_cutout_yungblud">
            <img src="./yungblud.jpg" className="AMP_card_img_yungblud" alt="Band" />
          </div>

          <div className="AMP_content_yungblud">
            <div className="AMP_card_content_yungblud">
              <div className="AMP_name_yungblud">YUNGBLUD</div>
              <div className="AMP_hashtag_yungblud">#Rock-Band</div>
              <div className="AMP_like_button_yungblud">
                <div className="AMP_icon_yungblud">♥</div>
                <div className="AMP_count_yungblud"></div>
              </div>
              <div className="AMP_intro_yungblud">YUNGBLUD 밴드입니다.</div>
            </div>
          </div>
        </div>

        <div className="AMP_player_yungblud">
          <audio ref={audioRef}>
            <source src="HypeBoy.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="AMP_player_controls_yungblud">
            <button onClick={togglePlay} className="AMP_player_button_yungblud">
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button onClick={resetAudio} className="AMP_player_button_yungblud">⏹</button>
          </div>
        </div>

        <div className="AMP_community_popup_yungblud">
          <h3>Community Posts</h3>
            <div className="AMP_community_box_yungblud">
            Yungblud 는 영국의 싱어송라이터, 뮤지션, 배우로, 현대적인 펑크 록과 팝 펑크를 대표하는 인물 중 하나입니다. 
            그는 독특한 스타일과 반항적인 태도로 젊은 세대에게 큰 영향을 미치고 있으며,
             다양한 음악 장르를 넘나들며 사회적, 정치적 메시지를 강력하게 전달하는 아티스트로 알려져 있습니다.
            </div>  

            <div className="AMP_community_box_yungblud">
            그의 가사는 종종 사회적, 정치적 문제를 다루며, 젊은 세대의 목소리를 대변합니다. 
            특히, 정신 건강, 성적 정체성, 정치적 반항 등의 주제를 다루는 곡들이 많습니다.
            Yungblud는 자신의 팬들에게 자유롭고 독립적인 사고를 장려하며, 기존의 규범에 도전하는 메시지를 전달합니다.
            그는 에너지 넘치는 무대 퍼포먼스와 독특한 패션 감각으로 유명합니다. 그의 스타일은 종종 젠더 규범을 초월하며, 
            파격적인 의상과 메이크업을 통해 자신의 개성을 표현합니다.
            </div>   
                     
        </div>
      </div>
    </div>
  );
}

export default App;
