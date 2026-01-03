import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./GenreChoice.css";

const Genres = [
  "Pop",
  "Band",
  "Funk",
  "Rock",
  "Alternative",
  "Ballade",
  "Hiphop",
  "Jazz",
  "R&B",
  "Metal",
  "Country",
];

const GenreChoice = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();

  const addGenre = (genre) => {
    if (!selectedGenres.includes(genre)) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const removeGenre = (genre) => {
    const updatedGenres = selectedGenres.filter((g) => g !== genre);
    setSelectedGenres(updatedGenres);
  };

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const saveGenres = () => {
    // 로컬 스토리지에 저장 (실제 백엔드 연동 시 axios 사용)
    localStorage.setItem('selectedGenres', JSON.stringify(selectedGenres));
    alert("장르가 저장되었습니다.");
    navigate('/main');
  };

  const handleGenreClick = (genre) => {
    addGenre(genre);
  };

  return (
    <div className="GenreChoiceComponent">
      <Header />
      <div className="GenreChoiceWrapper">
        <div className="GenreChoiceHeader">
          <h1 className="GC_HeaderTitle">장르 선택</h1>
          <p className="GC_HeaderSubtitle">좋아하는 음악 장르를 선택하거나 드래그하여 담아보세요</p>
        </div>

        <div className="GenreBasket">
          <div className="GenreButtonsContainer">
            <h2 className="GenreSectionTitle">장르 선택</h2>
            <div className="GenreButtons">
              {Genres.map((genre, index) => (
                <button
                  key={index}
                  className={`GenreButton ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                  draggable="true"
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", genre)}
                  onClick={() => handleGenreClick(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="SelectedGenresContainer">
            <div className="SelectedGenresHeader">
              <h2 className="SelectedGenreTitle">선택한 장르 ({selectedGenres.length})</h2>
              <button className="GC_ToggleButton" onClick={togglePopup}>
                {popupVisible ? "접기 ▲" : "펼치기 ▼"}
              </button>
            </div>
            
            <div className={`GenrePopup ${popupVisible ? 'visible' : ''}`}>
              {selectedGenres.length === 0 ? (
                <div className="EmptyState">
                  <p>선택한 장르가 없습니다.</p>
                  <p className="EmptyStateHint">장르를 클릭하거나 드래그하여 추가하세요.</p>
                </div>
              ) : (
                <>
                  <ul className="SelectedList">
                    {selectedGenres.map((genre, index) => (
                      <li className="WishGenres_li" key={index}>
                        <span className="GenreTag">{genre}</span>
                        <button
                          className="GC_DeleteButton"
                          onClick={() => removeGenre(genre)}
                        >
                          삭제
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div
                    className="DropArea"
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.add('drag-over');
                    }}
                    onDragLeave={(e) => {
                      e.currentTarget.classList.remove('drag-over');
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('drag-over');
                      const genre = e.dataTransfer.getData("text/plain");
                      addGenre(genre);
                    }}
                  >
                    <span className="DropAreaIcon">📥</span>
                    <span>장르를 여기에 드래그하세요</span>
                  </div>
                </>
              )}
              <div className="ActionButtons">
                <button
                  type="submit"
                  className="NextPageButton"
                  onClick={saveGenres}
                  disabled={selectedGenres.length === 0}
                >
                  장르 선택 완료
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GenreChoice;
