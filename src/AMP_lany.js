import React, { useEffect, useRef, useState } from 'react';
import './AMP_lany.css'; // lany로 변경된 CSS 파일을 import 합니다.
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

    const cards = document.querySelectorAll(".AMP_card_lany");
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
    <div className="AMP_Container_lany">
      <div className="AMP_header_lany">
        <div className="AMP_main_logo_container_lany">

        </div>

        <div className="AMP_nav_lany">
          <ul className="AMP_ul1_lany">
            <li className="AMP_li_lany"><a href="#">|</a></li>
            <li className="AMP_li_lany"><a href="#">My Page</a></li>
          </ul>
        </div>
      </div>

      <div className="AMP_card_container_lany">
        <div className="AMP_platform_box_1_lany">
          <div className="youtube_logo_lany" onClick={() => handleLogoClick('https://www.youtube.com/@thisisLANY')}></div>
          <div className="spotify_logo_lany" onClick={() => handleLogoClick('https://open.spotify.com/artist/49tQo2QULno7gxHutgccqF')}></div>
          <div className="instagram_logo_lany" onClick={() => handleLogoClick('https://www.instagram.com/thisislany/')}></div>
          <div className="soundcloud_logo_lany" onClick={() => handleLogoClick('https://soundcloud.com/thisislany')}></div>
        </div>

        <div className="AMP_card_lany AMP_border_right_behind_lany AMP_border_bottom_behind_lany">
          <div className="AMP_shadow_lany"></div>
          <div className="AMP_image_lany AMP_background_lany"></div>
          <div className="AMP_image_lany AMP_cutout_lany">
            <img src="./lany.jpg" className="AMP_card_img_lany" alt="Band" />
          </div>

          <div className="AMP_content_lany">
            <div className="AMP_card_content_lany">
              <div className="AMP_name_lany">lany</div>
              <div className="AMP_hashtag_lany">#Pop-Band</div>
              <div className="AMP_like_button_lany">
                <div className="AMP_icon_lany">♥</div>
                <div className="AMP_count_lany"></div>
              </div>
              <div className="AMP_intro_lany">lany 밴드입니다.</div>
            </div>
          </div>
        </div>

        <div className="AMP_player_lany">
          <audio ref={audioRef}>
            <source src="HypeBoy.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="AMP_player_controls_lany">
            <button onClick={togglePlay} className="AMP_player_button_lany">
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button onClick={resetAudio} className="AMP_player_button_lany">⏹</button>
          </div>
        </div>

        <div className="AMP_community_popup_lany">
          <h3>Community Posts</h3>
            <div className="AMP_community_box_lany">
              미국의 인디 팝 밴드이다. 2014년 결성되었으며, 캘리포니아 주 로스앤젤레스 출신의 남성 2인조 밴드이다. 
              밴드명 "LANY"는 Los Angeles(LA)와 New York(NY)의 약자를 따 지었으며,
              로스 앤젤레스부터 뉴욕까지 미국 전역을 아우르는 음악을 만들겠다는 포부가 담긴 이름이라고 한다. 
              음악적 특징으로는 대부분의 곡이 몽환적인 분위기를 띠며, 강한 베이스 사운드를 즐겨 사용한다. 
              가사는 주로 이성 간의 사랑에 대한 내용이 많지만, 진정한 삶의 의미나 부모님에 대한 사랑 등을 다룬 노래들도 있다.
              솔직하고 담백한 어투의 가사와 폴 클라인 특유의 중독적인 보컬 사운드, 몽환적인 멜로디로 매니아층이 매우 탄탄하다.
            </div>  

            <div className="AMP_community_box_lany">
              
            </div>   
                     
        </div>
      </div>
    </div>
  );
}

export default App;
