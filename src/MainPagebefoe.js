import React, { useState } from 'react';
import './MainPage.css';
import GenreChoice from './GenreChoice';
import { useNavigate } from 'react-router-dom';
import Header from './Headerbefore';
import Footer from './Footer';

const MainPage1 = () => {
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

    return (
        <div className="MainpageContainer">
            <Header />
            <div className="MP_Contents">
                {isPopupVisible && (
                    <div className="PopupOverlay">
                        <div className="MP_Popup">
                            <button className="MP_CloseButton" onClick={closePopup}>닫기</button>
                            <GenreChoice />
                        </div>
                    </div>
                )}
                <button className="PageMove" onClick={handlePageMoveClick}>장르선택</button>
                <div className="MP_Box1" onClick={onClickBox1}>
                    <div id="MP_Box1Image">
                        <img src="./2d.png" alt="Artist Profile" />
                        <div id="MainContent1" className="MainContent">
                            <h3>아티스트 프로필 카드</h3>
                            <p>아티스트들의 프로필 카드들을 볼 수 있는 공간입니다.</p>
                            
                        </div>
                    </div>
                </div>
                <div className="MP_Box2" onClick={onClickBox2}>
                    <div id="MP_Box2Image">
                        <img src="./3d.png" alt="Artist Short Form" />
                        <div id="MainContent2" className="MainContent">
                            <h3>아티스트 숏폼</h3>
                            <p>아티스트들의 프로필 카드들을 숏폼의 형태로 볼 수 있는 공간입니다.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MainPage1;
