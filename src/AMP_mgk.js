import React, { useEffect, useRef, useState } from 'react';
import './AMP_mgk.css'; // mgk로 변경된 CSS 파일을 import 합니다.
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

    const cards = document.querySelectorAll(".AMP_card_mgk");
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
    <div className="AMP_Container_mgk">
      <div className="AMP_header_mgk">
        <div className="AMP_main_logo_container_mgk">
     
        </div>

        <div className="AMP_nav_mgk">
          <ul className="AMP_ul1_mgk">
            <li className="AMP_li_mgk"><a href="#">|</a></li>
            <li className="AMP_li_mgk"><a href="#">My Page</a></li>
          </ul>
        </div>
      </div>

      <div className="AMP_card_container_mgk">
        <div className="AMP_platform_box_1_mgk">
          <div className="youtube_logo_mgk" onClick={() => handleLogoClick('https://www.youtube.com/@mgk')}></div>
          <div className="spotify_logo_mgk" onClick={() => handleLogoClick('https://open.spotify.com/artist/6TIYQ3jFPwQSRmorSezPxX')}></div>
          <div className="instagram_logo_mgk" onClick={() => handleLogoClick('https://www.instagram.com/machinegunkelly/')}></div>
          <div className="soundcloud_logo_mgk" onClick={() => handleLogoClick('https://soundcloud.com/mgk')}></div>
        </div>

        <div className="AMP_card_mgk AMP_border_right_behind_mgk AMP_border_bottom_behind_mgk">
          <div className="AMP_shadow_mgk"></div>
          <div className="AMP_image_mgk AMP_background_mgk"></div>
          <div className="AMP_image_mgk AMP_cutout_mgk">
            <img src="./mgk.jpg" className="AMP_card_img_mgk" alt="Band" />
          </div>

          <div className="AMP_content_mgk">
            <div className="AMP_card_content_mgk">
              <div className="AMP_name_mgk">mgk</div>
              <div className="AMP_hashtag_mgk">#Pop-Band</div>
              <div className="AMP_like_button_mgk">
                <div className="AMP_icon_mgk">♥</div>
                <div className="AMP_count_mgk"></div>
              </div>
              <div className="AMP_intro_mgk">mgk 밴드입니다.</div>
            </div>
          </div>
        </div>

        <div className="AMP_player_mgk">
          <audio ref={audioRef}>
            <source src="HypeBoy.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="AMP_player_controls_mgk">
            <button onClick={togglePlay} className="AMP_player_button_mgk">
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button onClick={resetAudio} className="AMP_player_button_mgk">⏹</button>
          </div>
        </div>

        <div className="AMP_community_popup_mgk">
          <h3>Community Posts</h3>
            <div className="AMP_community_box_mgk">
            머신건 켈리(Machine Gun Kelly, MGK)라는 예명으로 잘 알려진 컬슨 베이커(Colson Baker)는 미국의 래퍼, 가수, 배우입니다.
             그는 1990년 4월 22일 미국 텍사스주 휴스턴에서 태어났으며, 음악적 재능과 독특한 스타일로 전 세계적으로 많은 팬을 확보하고 있습니다. 
             MGK는 그의 음악 커리어를 통해 힙합과 록 음악 장르를 성공적으로 결합한 아티스트로 평가받고 있습니다.
            </div>  

            <div className="AMP_community_box_mgk">
              MGK는 힙합과 록 음악의 경계를 허무는 아티스트로 평가받습니다.
              그의 초기 음악은 주로 힙합 중심이었으나, 최근 몇 년 동안 그는 팝 펑크와 록 음악으로의 전환을 시도하며 새로운 스타일을 개척하고 있습니다.
              그의 음악은 개인적인 이야기, 감정적 솔직함, 그리고 때로는 반항적인 태도를 담고 있습니다.
            </div>   
                     
        </div>
      </div>
    </div>
  );
}

export default App;
