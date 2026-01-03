import React, { useEffect, useRef, useState } from 'react';
import './AMP_knox.css'; // Knox에 맞게 CSS 파일 경로 수정
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

    const cards = document.querySelectorAll(".AMP_card_knox"); // 클래스 이름 변경
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
    <div className="AMP_Container_knox"> {/* 클래스 이름 변경 */}
      <div className="AMP_header_knox">
        <div className="AMP_main_logo_container_knox">
    
        </div>

        <div className="AMP_nav_knox">
          <ul className="AMP_ul1_knox">
            <li className="AMP_li_knox"><a href="#">|</a></li>
            <li className="AMP_li_knox"><a href="#">My Page</a></li>
          </ul>
        </div>
      </div>

      <div className="AMP_card_container_knox">
        <div className="AMP_platform_box_1_knox">
          <div className="youtube_logo_knox" onClick={() => handleLogoClick('https://www.youtube.com/@KnoxHill')}></div>
          <div className="spotify_logo_knox" onClick={() => handleLogoClick('https://open.spotify.com/artist/61S5H9Lxn1PDUvu1TV0kCX')}></div>
          <div className="instagram_logo_knox" onClick={() => handleLogoClick('https://www.instagram.com/musicbyknox/')}></div>
          <div className="soundcloud_logo_knox" onClick={() => handleLogoClick('https://soundcloud.com/musicbyknox')}></div>
        </div>

        <div className="AMP_card_knox AMP_border_right_behind_knox AMP_border_bottom_behind_knox"> {/* 클래스 이름 변경 */}
          <div className="AMP_shadow_knox"></div>
          <div className="AMP_image_knox AMP_background_knox"></div>
          <div className="AMP_image_knox AMP_cutout_knox">
            <img src="./knox.jpg" className="AMP_card_img_knox" alt="Band" /> {/* 이미지 경로 변경 */}
          </div>

          <div className="AMP_content_knox">
            <div className="AMP_card_content_knox">
              <div className="AMP_name_knox">Knox</div> {/* 텍스트 변경 */}
              <div className="AMP_hashtag_knox">#Rock-Band</div> {/* 텍스트 변경 */}
              <div className="AMP_like_button_knox">
                <div className="AMP_icon_knox">♥</div>
                <div className="AMP_count_knox"></div> {/* 좋아요 수 변경 */}
              </div>
              <div className="AMP_intro_knox">Knox 밴드입니다.</div> {/* 텍스트 변경 */}
            </div>
          </div>
        </div>

        <div className="AMP_player_knox">
          <audio ref={audioRef}>
            <source src="HypeUp.mp3" type="audio/mpeg" /> {/* 오디오 파일 경로 변경 */}
            Your browser does not support the audio element.
          </audio>
          <div className="AMP_player_controls_knox">
            <button onClick={togglePlay} className="AMP_player_button_knox">
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button onClick={resetAudio} className="AMP_player_button_knox">⏹</button>
          </div>
        </div>

        <div className="AMP_community_popup_knox">
          <h3>Community Posts</h3>
            <div className="AMP_community_box_knox">
            Knox는 현대적이고 감각적인 음악을 선보이는 아티스트입니다.
            그의 음악은 감성적이고 다채로운 멜로디와 함께 깊이 있는 가사로 구성되어 있습니다. 
            Knox는 자신만의 독특한 음악적 스타일을 가지고 있으며, 그의 곡들은 청중들에게 깊이 있는 감정을 전달합니다. 
            그의 창작 활동은 다양한 음악적 영향을 받아 현대 팝 음악의 새로운 방향성을 제시하고 있습니다.
            </div>  

            <div className="AMP_community_box_knox">
            Knox는 자신만의 독특한 음악적 스타일과 섬세한 악기 연주로 주목받고 있습니다. 
            그의 음악은 감성적이고 깊이 있는 가사로 구성되어 있어 청중들에게 감정적인 호소력을 전달합니다. 
            또한 그의 곡들은 현대적인 사운드와 전통적인 음악 요소를 조화롭게 결합하여, 현대 팝 음악의 새로운 차원을 보여주고 있습니다. 
            Knox의 창작 활동은 그의 고유한 음악적 비전을 탐구하며, 다양한 리스너들에게 긍정적인 영향을 미치고 있습니다.
            </div>   
                     
        </div>
      </div>
    </div>
  );
}

export default App;
