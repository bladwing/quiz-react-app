import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./popup.scss";

export default function PopupMain() {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handlePopupClick = (e) => {
    if (!popupRef.current.contains(e.target)) {
      setShowPopup(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  return (
    <div className="buttons-wrapper">
      <button className="tryAgain" onClick={openPopup}>
        Main Page
      </button>
      {showPopup && (
        <div
          style={{
            visibility: showPopup ? "visible" : "hidden",
            opacity: showPopup ? "1" : "0",
          }}
          className="overlay"
          onClick={handlePopupClick}
        >
          <div className="popup" ref={popupRef}>
            <h3>Are you sure you want to go main page?</h3>

            <span className="close button2" onClick={closePopup}>
              X
            </span>

            <Link to="/" className="button2 goMain">
              Yes
            </Link>

            <button onClick={closePopup}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}
