import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [popupVisible, setPopupVisible] = useState(false);
    const navigate = useNavigate();

    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    };

    const handleMenuClick = (path) => {
        navigate(path);
        setPopupVisible(false);
    };

    return (
        <>
            <header className="MainHeader">
                <div className="Header_Left">
                    <Link to="/main" className="Header_Logo">
                        <span className="Header_LogoText">Page of Artists</span>
                    </Link>
                    <nav className="Header_Nav_Desktop">
                        <Link to="/main" className="Nav_Link">홈</Link>
                        <Link to="/carousel" className="Nav_Link">아티스트 탐색</Link>
                        <Link to="/shortForm" className="Nav_Link">3D 숏폼</Link>
                        <Link to="/choice" className="Nav_Link">장르 선택</Link>
                    </nav>
                </div>
                <button className="Header_PopupButton" onClick={togglePopup}>
                    ☰
                </button>
                <div className="Header_RightSide">
                    <Link to="/login" className="MyPageLink">로그인</Link>
                    <span className="Header_Divider">|</span>
                    <Link to="/artistmypagemanage" className="MyPageLink">마이페이지</Link>
                </div>
            </header>

            {popupVisible && (
                <>
                    <div className="Header_PopupOverlay" onClick={togglePopup}></div>
                    <div className="Header_PopupMenu">
                        <div className="PopupMenu_Header">
                            <span className="PopupMenu_Title">메뉴</span>
                            <button className="PopupMenu_Close" onClick={togglePopup}>✕</button>
                        </div>
                        <ul className="PopupMenu_Ul">
                            <li className="PopupMenuItem">
                                <Link to="/main" onClick={() => setPopupVisible(false)}>홈</Link>
                            </li>
                            <li className="PopupMenuItem">
                                <Link to="/carousel" onClick={() => setPopupVisible(false)}>아티스트 탐색</Link>
                            </li>
                            <li className="PopupMenuItem">
                                <Link to="/shortForm" onClick={() => setPopupVisible(false)}>3D 숏폼</Link>
                            </li>
                            <li className="PopupMenuItem">
                                <Link to="/choice" onClick={() => setPopupVisible(false)}>장르 선택</Link>
                            </li>
                            <li className="PopupMenuItem">
                                <Link to="/login" onClick={() => setPopupVisible(false)}>로그인</Link>
                            </li>
                            <li className="PopupMenuItem">
                                <Link to="/artistmypagemanage" onClick={() => setPopupVisible(false)}>마이페이지</Link>
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </>
    );
};

export default Header;
