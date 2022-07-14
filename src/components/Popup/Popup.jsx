import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SaveAttempt } from "../../utils/LocalStorage";
import "./popup.scss";

export default function Popup(props) {
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
  const saveRefresh = () => {
    window.location.reload(false);
    SaveAttempt(props.value, props.total);
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
          onClick={handlePopupClick}
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
      <Link to="/" className="button">
        <button ClassName="butto2" onClick={openPopup}>
          მთავარი გვერდი
        </button>
      </Link>
    </div>
  );
}
