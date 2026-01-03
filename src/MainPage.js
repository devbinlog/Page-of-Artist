import React, { useState } from 'react';
import './MainPage.css';
import GenreChoice from './GenreChoice';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { artistsData, projectStats, genres } from './data/artistsData';

const MainPage = () => {
    const navigate = useNavigate();
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const onClickBox1 = () => {
        navigate('/carousel');
    };

    const onClickBox2 = () => {
        navigate('/shortForm');
    };

    const handlePageMoveClick = () => {
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    // Featured Artists (처음 6개)
    const featuredArtists = artistsData.slice(0, 6);

    return (
        <div className="MainpageContainer">
            <Header />
            
            {/* Hero Section */}
            <section className="Hero_Section">
                <div className="Hero_Content">
                    <h1 className="Hero_Title">Page of Artists</h1>
                    <p className="Hero_Subtitle">아티스트를 위한 홍보 플랫폼</p>
                    <p className="Hero_Description">
                        신인 아티스트들이 자신의 음악과 가치를 전 세계에 알릴 수 있는 기회를 제공합니다.<br/>
                        아티스트는 자신을 홍보하고, 팬들은 새로운 음악을 발견할 수 있습니다.
                    </p>
                    <div className="Hero_Buttons">
                        <button className="Hero_Button_Primary" onClick={onClickBox1}>
                            아티스트 탐색하기
                        </button>
                        <button className="Hero_Button_Secondary" onClick={handlePageMoveClick}>
                            장르 선택하기
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="Stats_Section">
                <div className="Stats_Container">
                    <div className="Stat_Item">
                        <div className="Stat_Number">{projectStats.totalArtists}+</div>
                        <div className="Stat_Label">아티스트</div>
                    </div>
                    <div className="Stat_Item">
                        <div className="Stat_Number">{projectStats.totalGenres}</div>
                        <div className="Stat_Label">장르</div>
                    </div>
                    <div className="Stat_Item">
                        <div className="Stat_Number">{projectStats.totalUsers}</div>
                        <div className="Stat_Label">사용자</div>
                    </div>
                    <div className="Stat_Item">
                        <div className="Stat_Number">{projectStats.totalSongs}+</div>
                        <div className="Stat_Label">음악</div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="Features_Section">
                <h2 className="Section_Title">주요 기능</h2>
                <div className="Features_Grid">
                    <div className="Feature_Card" onClick={onClickBox1}>
                        <div className="Feature_Icon">🎴</div>
                        <h3 className="Feature_Title">아티스트 프로필 카드</h3>
                        <p className="Feature_Description">
                            3D 캐러셀로 아티스트들을 탐색하고, 각 아티스트의 프로필 카드를 확인할 수 있습니다.
                        </p>
                    </div>
                    <div className="Feature_Card" onClick={onClickBox2}>
                        <div className="Feature_Icon">🎬</div>
                        <h3 className="Feature_Title">3D 숏폼</h3>
                        <p className="Feature_Description">
                            인터랙티브 3D 효과가 적용된 숏폼 형태로 아티스트의 프로필을 시각적으로 경험할 수 있습니다.
                        </p>
                    </div>
                    <div className="Feature_Card" onClick={handlePageMoveClick}>
                        <div className="Feature_Icon">🎵</div>
                        <h3 className="Feature_Title">장르 선택</h3>
                        <p className="Feature_Description">
                            11가지 장르 중 선호하는 장르를 선택하여 원하는 아티스트를 더 쉽게 찾을 수 있습니다.
                        </p>
                    </div>
                    <div className="Feature_Card" onClick={() => navigate('/artistmypagemanage')}>
                        <div className="Feature_Icon">👤</div>
                        <h3 className="Feature_Title">마이페이지</h3>
                        <p className="Feature_Description">
                            아티스트는 자신의 프로필을 관리하고, 음악을 업로드하며, 팬들과 소통할 수 있습니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Artists Section */}
            <section className="FeaturedArtists_Section">
                <h2 className="Section_Title">추천 아티스트</h2>
                <div className="Artists_Grid">
                    {featuredArtists.map((artist) => (
                        <div 
                            key={artist.id} 
                            className="Artist_Card"
                            onClick={() => navigate(`/amp_${artist.id}`)}
                        >
                            <div className="Artist_Image_Wrapper">
                                <img src={artist.image} alt={artist.name} className="Artist_Image" />
                                <div className="Artist_Overlay">
                                    <span className="Artist_Followers">{artist.followers} 팔로워</span>
                                </div>
                            </div>
                            <div className="Artist_Info">
                                <h3 className="Artist_Name">{artist.name}</h3>
                                <p className="Artist_Genre">{artist.genre}</p>
                                <div className="Artist_Hashtags">
                                    {artist.hashtags.slice(0, 3).map((tag, idx) => (
                                        <span key={idx} className="Artist_Hashtag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quick Access Section */}
            <section className="QuickAccess_Section">
                <div className="QuickAccess_Container">
                    <div className="QuickAccess_Box" onClick={onClickBox1}>
                        <div className="QuickAccess_Icon">🎴</div>
                        <h3>아티스트 프로필 카드</h3>
                        <p>2D 카드 형태로 아티스트 프로필 탐색</p>
                        <span className="QuickAccess_Arrow">→</span>
                    </div>
                    <div className="QuickAccess_Box" onClick={onClickBox2}>
                        <div className="QuickAccess_Icon">🎬</div>
                        <h3>아티스트 숏폼</h3>
                        <p>3D 효과가 적용된 숏폼 형태의 프로필</p>
                        <span className="QuickAccess_Arrow">→</span>
                    </div>
                </div>
            </section>

            {/* Genre Preview Section */}
            <section className="GenrePreview_Section">
                <h2 className="Section_Title">음악 장르</h2>
                <div className="Genres_Grid">
                    {genres.map((genre, index) => (
                        <div key={index} className="Genre_Pill" onClick={handlePageMoveClick}>
                            <span className="Genre_Icon">{genre.icon}</span>
                            <span className="Genre_Name">{genre.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Genre Choice Popup */}
            {isPopupVisible && (
                <div className="PopupOverlay">
                    <div className="MP_Popup">
                        <button className="MP_CloseButton" onClick={closePopup}>✕</button>
                        <GenreChoice />
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default MainPage;
