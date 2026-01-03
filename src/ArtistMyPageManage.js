import React, { useEffect, useRef, useState } from 'react';
import './ArtistMyPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function App() {
  const audioRef = useRef(null);
  const fileInputRef = useRef(null); // 파일 업로드를 위한 ref
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(true); // 초기에 팝업을 보이도록 설정
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 여부
  const [profileData, setProfileData] = useState({
    name: "본인 이름 작성",
    genre: "본인 장르 선택",
    intro: "본인 자기소개글 작성",
    profileImage: "", // 기본 프로필 이미지 경로
    platformLinks: {
      youtube: 'https://www.youtube.com',
      spotify: 'https://www.spotify.com',
      instagram: 'https://www.instagram.com',
      soundcloud: 'https://soundcloud.com'
    }
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const angle = 30;

  function remap(value, oldMax, newMax) {
    const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
    return Math.min(Math.max(newValue, -newMax), newMax);
  }

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isEditing) {
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
      }
    };

    const handleMouseOut = (event) => {
      if (!isEditing) {
        const e = event.currentTarget;
        if (e instanceof HTMLElement) {
          e.style.setProperty("--rotateX", '0deg');
          e.style.setProperty("--rotateY", '0deg');
        }
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
  }, [isEditing]);

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

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      setPosts([newPost, ...posts]);
      setNewPost("");
    }
  };

  const moveToAMPEdit = () => {
    if (isEditing && selectedFile) {
      uploadFile(selectedFile, profileData.name);
    }
    setIsEditing(!isEditing);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProfileData({ ...profileData, profileImage: reader.result });
      };
    }
  };

  const uploadFile = async (file, artistName) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`http://ec2-52-78-200-139.ap-northeast-2.compute.amazonaws.com:8080/api/files/artists/${artistName}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        console.log('File uploaded successfully');
      } else {
        throw new Error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleSaveClick = () => {
    if (isEditing && selectedFile) {
      uploadFile(selectedFile, profileData.name);
    }
    setIsEditing(!isEditing);
  };



  return (
      <div className="AMP_Container">
        <div className="AMP_header">
          <div className="AMP_main_logo_container">
            {/* 로고 이미지 추가 */}
          </div>

          <div className="AMP_nav">
            <ul className="AMP_ul1">
              <li className="AMP_li"><a href="#">|</a></li>
              <li className="AMP_li"> <Link to="/main">MainPage</Link></li>
            </ul>
          </div>
        </div>

        <div className="AMP_card_container">
          <div className="AMP_platform_box_1">
            <div className="youtube_logo" onClick={() => handleLogoClick(profileData.platformLinks.youtube)}></div>
            <div className="spotify_logo" onClick={() => handleLogoClick(profileData.platformLinks.spotify)}></div>
            <div className="instagram_logo" onClick={() => handleLogoClick(profileData.platformLinks.instagram)}></div>
            <div className="soundcloud_logo" onClick={() => handleLogoClick(profileData.platformLinks.soundcloud)}></div>
          </div>


          {/* 프로필 카드 */}
          <div className="AMP_card AMP_border_right_behind AMP_border_bottom_behind">
            <div className="AMP_shadow"></div>
            <div className="AMP_image AMP_background"></div>
            <div className="AMP_image AMP_cutout">
              <img src={profileData.profileImage} className="AMP_card_img" />
            </div>

            <div className="AMP_content">
              <div className="AMP_card_content">
                {isEditing ? (
                    // 편집 모드일 때
                    <>
                      <div className="file_upload">
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} />
                        <button onClick={() => fileInputRef.current && fileInputRef.current.click()}>Upload</button>
                      </div>
                      <input
                          type="text"
                          className="AMP_name_edit"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                      <input
                          type="text"
                          className="AMP_hashtag_edit"
                          value={profileData.genre}
                          onChange={(e) => setProfileData({ ...profileData, genre: e.target.value })}
                      />
                      <textarea
                          className="AMP_intro_edit"
                          value={profileData.intro}
                          onChange={(e) => setProfileData({ ...profileData, intro: e.target.value })}
                      />
                    </>
                ) : (
                    // 편집 모드가 아닐 때
                    <>
                      <div className="AMP_name">{profileData.name}</div>
                      <div className="AMP_hashtag">{profileData.genre}</div>
                      <div className="AMP_like_button">
                        <div className="AMP_icon">♥</div>

                      </div>
                      <div className="AMP_intro">{profileData.intro}</div>
                    </>
                )}
              </div>
            </div>

          </div>

          <div className="AMP_profile_actions">
            {/* 프로필 편집/저장 버튼 */}
            <div className="AMP_footer">
              <div className="AMP_edit_button" onClick={handleSaveClick}>
                {isEditing ? "저장" : "편집"}
              </div>
            </div>
          </div>

          {/* 오디오 플레이어 섹션 */}
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
              {isEditing && (
                  <div className="file_upload">
                    <input type="file" accept="audio/*" ref={fileInputRef} onChange={handleFileUpload} />
                    <button onClick={() => fileInputRef.current && fileInputRef.current.click()}>Upload</button>
                  </div>
              )}

            </div>
          </div>
          <div>

          </div>

          {/* 커뮤니티 팝업 */}
          {showPopup && (
              <div className="AMP_community_popup">
                <h3>Community Posts</h3>
                <div className="AMP_post_input">
              <textarea
                  placeholder="글을작성해주세요..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
              />
                  <button onClick={handlePostSubmit}>게시</button>
                </div>
                <ul className="AMP_post_list">
                  {posts.map((post, index) => (
                      <li key={index} className="AMP_post_item">
                        {post}
                      </li>
                  ))}
                </ul>
              </div>
          )}
        </div>
      </div>
  );
}

export default App;
