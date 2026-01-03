import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 라우팅을 위한 Link 추가
import './Header.css';

const Header = () => {
    const [popupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    };

    return (
        <>
            <header className="MainHeader">
                <button className="Header_PopupButton" onClick={togglePopup}>=</button>
                <div className="Header_Nav">
                    <div className="Header_RightSide">

                        <span className='MyPageLink'> <Link to="/login">Login</Link></span>
                        <span>|</span>
                        <span className="MyPageLink">
                        <Link to="/artistmypagemanage">MyPage</Link></span>
                        
                    </div>
                </div>
            </header>

            {popupVisible && (
                <div className="Header_PopupMenu">
                    <ul className="PopupMenu_Ul">
                        
                        <li className="PopupMenuItem">
                            <Link to="/choice">장르선택</Link>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Header;
