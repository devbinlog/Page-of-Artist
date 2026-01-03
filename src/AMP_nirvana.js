import React, { useEffect, useRef, useState } from 'react';
import './AMP_nirvana.css';  // 파일명 변경
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

    const cards = document.querySelectorAll(".AMP_card_nirvana");  // 클래스명 변경
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
    <div className="AMP_Container_nirvana">  {/* 클래스명 변경 */}
      <div className="AMP_header_nirvana">  {/* 클래스명 변경 */}
        <div className="AMP_main_logo_container_nirvana">  {/* 클래스명 변경 */}

        </div>

        <div className="AMP_nav_nirvana">  {/* 클래스명 변경 */}
          <ul className="AMP_ul1_nirvana">  {/* 클래스명 변경 */}
            <li className="AMP_li_nirvana"><a href="#">|</a></li>  {/* 클래스명 변경 */}
            <li className="AMP_li_nirvana"><a href="#">My Page</a></li>  {/* 클래스명 변경 */}
          </ul>
        </div>
      </div>

      <div className="AMP_card_container_nirvana">  {/* 클래스명 변경 */}
        <div className="AMP_platform_box_1_nirvana">  {/* 클래스명 변경 */}
          <div className="youtube_logo_nirvana" onClick={() => handleLogoClick('https://www.youtube.com/@nirvana')}></div>  {/* 클래스명 변경 */}
          <div className="spotify_logo_nirvana" onClick={() => handleLogoClick('https://open.spotify.com/artist/6olE6TJLqED3rqDCT0FyPh')}></div>  {/* 클래스명 변경 */}
          <div className="instagram_logo_nirvana" onClick={() => handleLogoClick('https://www.instagram.com/nirvana/')}></div>  {/* 클래스명 변경 */}
          <div className="soundcloud_logo_nirvana" onClick={() => handleLogoClick('https://soundcloud.com/nirvana')}></div>  {/* 클래스명 변경 */}
        </div>

        <div className="AMP_card_nirvana AMP_border_right_behind_nirvana AMP_border_bottom_behind_nirvana">  {/* 클래스명 변경 */}
          <div className="AMP_shadow_nirvana"></div>  {/* 클래스명 변경 */}
          <div className="AMP_image_nirvana AMP_background_nirvana"></div>  {/* 클래스명 변경 */}
          <div className="AMP_image_nirvana AMP_cutout_nirvana">
            <img src="./nirvana.jpg" className="AMP_card_img_nirvana" alt="Band" />  {/* 클래스명 변경 */}
          </div>

          <div className="AMP_content_nirvana">  {/* 클래스명 변경 */}
            <div className="AMP_card_content_nirvana">  {/* 클래스명 변경 */}
              <div className="AMP_name_nirvana">Nirvana</div>  {/* 클래스명 변경 */}
              <div className="AMP_hashtag_nirvana">#Grunge-Band</div>  {/* 클래스명 변경 */}
              <div className="AMP_like_button_nirvana">  {/* 클래스명 변경 */}
                <div className="AMP_icon_nirvana">♥</div>  {/* 클래스명 변경 */}
                <div className="AMP_count_nirvana"></div>  {/* 클래스명 변경 */}
              </div>
              <div className="AMP_intro_nirvana">Nirvana 밴드입니다.</div>  {/* 클래스명 변경 */}
            </div>
          </div>
        </div>

        <div className="AMP_player_nirvana">  {/* 클래스명 변경 */}
          <audio ref={audioRef}>
            <source src="HypeBoy.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="AMP_player_controls_nirvana">  {/* 클래스명 변경 */}
            <button onClick={togglePlay} className="AMP_player_button_nirvana">
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button onClick={resetAudio} className="AMP_player_button_nirvana">⏹</button>  {/* 클래스명 변경 */}
          </div>
        </div>

        <div className="AMP_community_popup_nirvana">
          <h3>Community Posts</h3>
            <div className="AMP_community_box_nirvana">
            너바나는 미국의 록 밴드이다. 1987년 워싱턴주 애버딘에서 결성되었다. 리드 싱어 겸 기타리스트 커트 코베인과 베이시스트 크리스 노보셀릭이 결성하였고, 드러머는 채드 채닝을 비롯하여 여러 사람으로 교체되다가 1990년 데이브 그롤으로 정착하였다. 너바나의 성공은 얼터너티브 록을 유명화시켰으며 아울러 X 세대의 대표 밴드로 언급되기도 한다. 너바나의 음악은 현대 로큰롤 문화에도 지속적인 영향을 미치고 있다
            </div>  

            <div className="AMP_community_box_nirvana">
              너바나는 1990년대 초반의 음악계를 지배하며, 팝과 헤비 메탈이 주류를 이루던 시기에 록 음악의 판도를 뒤흔들었습니다.
              그들은 인디 록에서 메인스트림으로 넘어오면서 새로운 장르와 사운드를 대중에게 소개했습니다.
              커트 코베인은 그 자체로 문화 아이콘이 되었으며, 그의 패션과 태도는 수많은 팬들에게 영향을 미쳤습니다.
              그가 젊은 나이에 사망하면서 너바나는 전설적인 밴드로 남아 있으며, "27 클럽"의 일원으로 그의 비극적인 삶과 죽음은 지속적으로 회자되고 있습니다
            </div>   
                     
        </div>
      </div>
    </div>
  );
}

export default App;
