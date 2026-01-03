import React, { useEffect, useRef, useState } from 'react';
import './AMP_oasis.css';  // 파일명 변경
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

    const cards = document.querySelectorAll(".AMP_card_oasis");  // 클래스명 변경
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
    <div className="AMP_Container_oasis">  {/* 클래스명 변경 */}
      <div className="AMP_header_oasis">  {/* 클래스명 변경 */}
        <div className="AMP_main_logo_container_oasis">  {/* 클래스명 변경 */}

        </div>

        <div className="AMP_nav_oasis">  {/* 클래스명 변경 */}
          <ul className="AMP_ul1_oasis">  {/* 클래스명 변경 */}
            <li className="AMP_li_oasis"><a href="#">|</a></li>  {/* 클래스명 변경 */}
            <li className="AMP_li_oasis"><a href="#">My Page</a></li>  {/* 클래스명 변경 */}
          </ul>
        </div>
      </div>

      <div className="AMP_card_container_oasis">  {/* 클래스명 변경 */}
        <div className="AMP_platform_box_1_oasis">  {/* 클래스명 변경 */}
          <div className="youtube_logo_oasis" onClick={() => handleLogoClick('https://www.youtube.com/@oasisinetofficial/videos')}></div>  {/* 클래스명 변경 */}
          <div className="spotify_logo_oasis" onClick={() => handleLogoClick('https://open.spotify.com/artist/2DaxqgrOhkeH0fpeiQq2f4')}></div>  {/* 클래스명 변경 */}
          <div className="instagram_logo_oasis" onClick={() => handleLogoClick('https://www.instagram.com/oasis/')}></div>  {/* 클래스명 변경 */}
          <div className="soundcloud_logo_oasis" onClick={() => handleLogoClick('https://soundcloud.com/oasisofficial')}></div>  {/* 클래스명 변경 */}
        </div>

        <div className="AMP_card_oasis AMP_border_right_behind_oasis AMP_border_bottom_behind_oasis">  {/* 클래스명 변경 */}
          <div className="AMP_shadow_oasis"></div>  {/* 클래스명 변경 */}
          <div className="AMP_image_oasis AMP_background_oasis"></div>  {/* 클래스명 변경 */}
          <div className="AMP_image_oasis AMP_cutout_oasis">
            <img src="./oasis.jpg" className="AMP_card_img_oasis" alt="Band" />  {/* 클래스명 변경 */}
          </div>

          <div className="AMP_content_oasis">  {/* 클래스명 변경 */}
            <div className="AMP_card_content_oasis">  {/* 클래스명 변경 */}
              <div className="AMP_name_oasis">oasis</div>  {/* 클래스명 변경 */}
              <div className="AMP_hashtag_oasis">#Pop-Band</div>  {/* 클래스명 변경 */}
              <div className="AMP_like_button_oasis">  {/* 클래스명 변경 */}
                <div className="AMP_icon_oasis">♥</div>  {/* 클래스명 변경 */}
                <div className="AMP_count_oasis"></div>  {/* 클래스명 변경 */}
              </div>
              <div className="AMP_intro_oasis">oasis 밴드입니다.</div>  {/* 클래스명 변경 */}
            </div>
          </div>
        </div>

        <div className="AMP_player_oasis">  {/* 클래스명 변경 */}
          <audio ref={audioRef}>
            <source src="HypeBoy.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="AMP_player_controls_oasis">  {/* 클래스명 변경 */}
            <button onClick={togglePlay} className="AMP_player_button_oasis">
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button onClick={resetAudio} className="AMP_player_button_oasis">⏹</button>  {/* 클래스명 변경 */}
          </div>
        </div>

        <div className="AMP_community_popup_oasis">
          <h3>Community Posts</h3>
            <div className="AMP_community_box_oasis">
            오아시스(영어: Oasis)는 1991년 잉글랜드 맨체스터에서 결성된 록 밴드이다. 
            초창기 멤버는 리암 갤러거(리드 보컬), 폴 "귁시" 맥기건(베이스), 폴 "본헤드" 아서스(기타) 그리고 토니 맥캐롤(드럼)이었고
             그 후 리암 갤러거의 형인 노엘 갤러거(기타, 보컬)가 곧 가입했다. 
             이들은 6700만 장이 넘는 앨범과 8개의 영국 차트 1위 싱글을 배출하며 1990년대 가장 성공적인 영국의 음악가로 부상했다.
              갤러거 형제는 1991년 밴드의 결성 이래로 해체할 당시까지 남아 있던 유일한 멤버이다. 
              해체 당시의 구성원은 갤러거 형제에 겜 아처(Gem Archer, 1966-, 리듬/리드 기타), 앤디 벨(Andy Bell, 1970-, 베이스 기타),
               크리스 샤록(Chris Sharrock, 1964-, 드럼 - 비공식 멤버)이 더해진 형태다. 
               곡과 가사적인 측면에서, 오아시스는 비틀즈, 더 후, 롤링 스톤스, 킹크스 등 브리티시 인베이전 밴드들의 영향을 가장 많이 받았다고 한다. 또한 스톤 로지스, 레드 제플린, 섹스 피스톨즈, 더 잼, 티렉스로부터도 영향을 받았다고 전해진다.
            </div>  

            <div className="AMP_community_box_oasis">
              
            </div>   
                     
        </div>
      </div>
    </div>
  );
}

export default App;
