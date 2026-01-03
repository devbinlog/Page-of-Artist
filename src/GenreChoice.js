import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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

  const saveGenres = async () => {
    try {
      const username = "고고고"; // 사용자 이름으로 받아야 함
      await axios.post("http://ec2-52-78-200-139.ap-northeast-2.compute.amazonaws.com:8080/api/genres", selectedGenres, {
        params: { username: username },
      });
      alert("장르가 저장되었습니다.");
    } catch (error) {
      console.error("장르 저장 오류:", error);
      
    }
  };

  return (
    <div className="GenreChoiceComponent">
      <div className="GenreChoiceHeader">
        <button className="GC_PopupButton" onClick={togglePopup}>
          {popupVisible ? "팝업 숨기기" : "담은 장르 목록"}
        </button>
        <h1 className="GC_HeaderTitle">장르선택 페이지</h1>
      </div>

      <div className="GenreBasket">
          <div style={{ display: !popupVisible ? "block" : "none", width: 370 }}></div>
        <div
          className="GenrePopup"
          style={{ display: popupVisible ? "block" : "none" }}
        >
          <h3 className="SelectedGenreTitle">담긴 장르</h3>
          <ul className="SelectedList">
            {selectedGenres.map((genre, index) => (
              <div className="WishGenres_li" key={index}>
                {genre}
                <button
                  className="GC_DeleteButton"
                  onClick={() => removeGenre(genre)}
                >
                  삭제
                </button>
              </div>
            ))}
            <div
              className="DropArea"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const genre = e.dataTransfer.getData("text/plain");
                addGenre(genre);
              }}
            >
              장르를 여기에 드래그하세요.
            </div>
            <div className="btns">
              <button
                type="submit"
                className="NextPageButton"
                onClick={saveGenres}
              >
                장르선택 완료
              </button>
              <button className="PopupDeleteButton" onClick={togglePopup}>
                {popupVisible ? "팝업 닫기" : ""}
              </button>
            </div>
          </ul>
        </div>
        <div className="GenreButtons">
          {Genres.map((genre, index) => (
            <button
              key={index}
              draggable="true"
              onDragStart={(e) => e.dataTransfer.setData("text/plain", genre)}
            >
              {genre.replace(" ", "")}
            </button>
          ))}
        </div>
        <div className="PageNavigationButtons">
          <Link to="/main" className="NavigationButton">
            메인 페이지로 이동하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GenreChoice;
