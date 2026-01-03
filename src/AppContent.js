import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import GenreChoice from "./GenreChoice";
import ArtistMyPageManage from "./ArtistMyPageManage";
import Login from "./Login";
import CarouselSection from "./CarouselSection";
import Main from"./MainPage";
import Mainbefore from"./MainPagebefoe";

import AMP5sos from "./AMP_5sos";
import AMPcoldplay from "./AMP_coldplay";
import AMPgreenday from "./AMP_greenday";
import AMPknox from "./AMP_knox";
import AMPlany from "./AMP_lany";
import AMPmgk from "./AMP_mgk";
import AMPnirvana from "./AMP_nirvana";
import AMPoasis from "./AMP_oasis";
import AMPthe1975 from "./AMP_the1975"
import AMPyungblud from "./AMP_yungblud"

function AppContent() {
    const { pathname } = useLocation(); // 현재 경로를 얻음

    return (
        <div className="app-content-container"> {/* Flexbox를 적용할 부모 컴포넌트 */}
            <div className="app-content-main"> {/* 실제 콘텐츠가 들어갈 영역 */}
                <Routes>
                    <Route path="/" element={<Navigate to="/main" replace />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/main1" element={<Mainbefore />} />
                    <Route path="/choice" element={<GenreChoice />} />
                    
                    <Route path="/artistmypagemanage" element={<ArtistMyPageManage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/carousel" element={<CarouselSection />} />

                    <Route path="/amp_5sos" element={<AMP5sos />} />
                    <Route path="/amp_coldplay" element={<AMPcoldplay />} />
                    <Route path="/amp_greenday" element={<AMPgreenday />} />
                    <Route path="/amp_knox" element={<AMPknox />} />
                    <Route path="/amp_lany" element={<AMPlany />} />
                    <Route path="/amp_mgk" element={<AMPmgk />} />
                    <Route path="/amp_nirvana" element={<AMPnirvana />} />
                    <Route path="/amp_oasis" element={<AMPoasis />} />
                    <Route path="/amp_the1975" element={<AMPthe1975 />} />
                    <Route path="/amp_yungblud" element={<AMPyungblud />} />
                </Routes>
            </div>
        </div>
    );
}

export default AppContent;
