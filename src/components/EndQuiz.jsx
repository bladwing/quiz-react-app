import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/popup.scss";

export default function TryAgain(props) {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const hidePopup = (e) => {
      if (!popupRef.current?.contains(e.target) && showPopup) {
        setShowPopup(true);
      }
    };
    window.addEventListener("click", hidePopup);

    return () => {
      window.removeEventListener("click", hidePopup);
    };
  });

  const saveAttempt = () => {
    let attempts = JSON.parse(localStorage.getItem("Attempts")) || [];
    let curDate = new Date();
    let dateToString = curDate.toLocaleString([], {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      second: "2-digit",
    });

    attempts.push({
      score: props.value,
      total: props.total,
      time: dateToString,
      expiry: curDate.getTime(10000),
    });

    attempts.sort((a, b) => {
      return a.score > b.score
        ? -1
        : a.score === b.score
        ? a.time > b.time
          ? -1
          : 1
        : 1;
    });

    localStorage.setItem("Attempts", JSON.stringify(attempts));
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const openPopup = () => {
    setShowPopup(true);
  };


  return (
    <div className="buttons-wrapper">
      <button onClick={openPopup}>მთავარი გვერდი</button>

      {showPopup && (
        <div
          style={{
            visibility: showPopup ? "visible" : "hidden",
            opacity: showPopup ? "1" : "0",
          }}
          className="overlay"
        >
          <div className="popup" ref={popupRef}>
            <h3>შევინახოთ შედეგი?</h3>

            <span className="close button2" onClick={closePopup}>
              X
            </span>
            <Link to="/">
              <button onClick={saveAttempt} className="Save">
                დიახ
              </button>
            </Link>

            <Link to="/" className="btn-link">
              <button>არა</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
