import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./popup.scss";

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
  const saveRefresh = () => {
    window.location.reload(false);
    saveAttempt();
  };

  const refreshOnly = () => {
    window.location.reload(false);
  };

  return (
    <div className="buttons-wrapper">
      <button className="tryAgain" onClick={openPopup}>
        ხელასხლა ცდა
      </button>
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

            <button onClick={saveRefresh} className="Save">
              დიახ
            </button>

            <button onClick={refreshOnly}>არა</button>
          </div>
        </div>
      )}

      <Link to="/">
        <button onClick={saveAttempt}>მთავარი გვერდი </button>
      </Link>

      <Link to="/history" className="button2">
        შედეგების ისტორია
      </Link>
    </div>
  );
}
