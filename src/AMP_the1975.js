import React, { useEffect, useRef, useState } from 'react';
import './AMP_the1975.css';
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

    const cards = document.querySelectorAll(".AMP_card_the1975");
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
    <div className="AMP_Container_the1975">
      <div className="AMP_header_the1975">
        <div className="AMP_main_logo_container_the1975">

        </div>

        <div className="AMP_nav_the1975">
          <ul className="AMP_ul1_the1975">
            <li className="AMP_li_the1975"><a href="#">|</a></li>
            <li className="AMP_li_the1975"><a href="#">My Page</a></li>
          </ul>
        </div>
      </div>

      <div className="AMP_card_container_the1975">
        <div className="AMP_platform_box_1_the1975">
          <div className="youtube_logo_the1975" onClick={() => handleLogoClick('https://www.youtube.com/@the1975')}></div>
          <div className="spotify_logo_the1975" onClick={() => handleLogoClick('https://open.spotify.com/artist/3mIj9lX2MWuHmhNCA7LSCW')}></div>
          <div className="instagram_logo_the1975" onClick={() => handleLogoClick('https://www.instagram.com/the1975/')}></div>
          <div className="soundcloud_logo_the1975" onClick={() => handleLogoClick('https://soundcloud.com/the1975')}></div>
        </div>

        <div className="AMP_card_the1975 AMP_border_right_behind_the1975 AMP_border_bottom_behind_the1975">
          <div className="AMP_shadow_the1975"></div>
          <div className="AMP_image_the1975 AMP_background_the1975"></div>
          <div className="AMP_image_the1975 AMP_cutout_the1975">
            <img src="./the1975.jpg" className="AMP_card_img_the1975" alt="Band" />
          </div>

          <div className="AMP_content_the1975">
            <div className="AMP_card_content_the1975">
              <div className="AMP_name_the1975">the1975</div>
              <div className="AMP_hashtag_the1975">#Pop-Band</div>
              <div className="AMP_like_button_the1975">
                <div className="AMP_icon_the1975">♥</div>
                <div className="AMP_count_the1975"></div>
              </div>
              <div className="AMP_intro_the1975">the1975 밴드입니다.</div>
            </div>
          </div>
        </div>

        <div className="AMP_player_the1975">
          <audio ref={audioRef}>
            <source src="HypeBoy.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="AMP_player_controls_the1975">
            <button onClick={togglePlay} className="AMP_player_button_the1975">
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button onClick={resetAudio} className="AMP_player_button_the1975">⏹</button>
          </div>
        </div>

        <div className="AMP_community_popup_the1975">
          <h3>Community Posts</h3>
            <div className="AMP_community_box_the1975">
            The 1975는 영국 체셔주 윔슬러 출신의 4인조 록 밴드이다. 
            현재는 맨체스터를 기점으로 활동하고 있다. 리드 보컬리스트, 프로듀서, 
            작사가이자 리듬 기타리스트인 매튜 힐리, 리드 기타리스트 애덤 한, 베이시스트 로스 맥도널드, 
            드러머 겸 프로듀서인 조지 대니얼로 이루어져 있다.
            </div>  

            <div className="AMP_community_box_the1975">
            영국 노섬벌랜드에서 태어나 뉴캐슬과 체셔 맥클스필드에서 자란 매튜 힐리는 윔 슬로우 고등학교에서
             로스 맥도널드, 아담 한, 조지 다니엘을 만난다. 시 의회에서 노년층과 청소년들의 화합을 위한 밴드 경연을 열기 시작했는데
              아담 한이 여자 친구를 통해 매튜 힐리에게 "이 연주회에서 공연을 하고 싶다."라고 말했고 이후 커버곡들을 연주해왔으나
             아담 한이 곡을 써왔다고 한다.
            아담 한이 밴드 멤버를 모집하기 시작했고, 매튜 힐리는 원래 드러머였지만 밴드의 보컬이 새 밴드를 만들기 위해
             떠나 힐리가 보컬을 맡게 되었고 조지 다니엘을 영입하며 지금의 The 1975가 되었다.
            </div>   
                     
        </div>
      </div>
    </div>
  );
}

export default App;
