import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ContextMenu from "../ContextMenu";
import "./history.scss";

export default function History() {
  const [attempts, setAttempts] = useState([]);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(0);
  const attemptItemRef = useRef(null);

  useEffect(() => {
    const attempts = JSON.parse(localStorage.getItem("Attempts")) || [];
    localStorage.setItem("Attempts", JSON.stringify(attempts));
    const tmpAttempts = JSON.parse(localStorage.getItem("Attempts") || []);
    setAttempts(tmpAttempts);
  }, []);

  const handleRightClick = (e, index) => {
    e.preventDefault();
    setShowContextMenu(true);
    setDeleteId(index);
    setYAxis(`${e.pageY}px`);
    setXAxis(`${e.pageX}px`);
  };

  const handleSettingContextMenuState = (newContextState) => {
    setShowContextMenu(newContextState);
  };
  const deleteFromHistory = (id) => {
    let tmp = [...attempts];
    tmp = tmp.filter((_, index) => index !== id);
    setAttempts(tmp);
    localStorage.setItem("Attempts", JSON.stringify(tmp));
  };
  return (
    <div className="historyContainer">
      <div>
        <h2 className="historyScore">შედეგების ისტორია</h2>
        <Link to="/" className="button2">
          მთავარი გვერდი
        </Link>
        <table className="historyTable">
          <thead>
            <tr>
              <th>#</th>
              <th>შედეგი</th>
              <th>თარიღი</th>
            </tr>
          </thead>
          <tbody>
            {attempts.length > 0 &&
              attempts.map((attempt, index) => (
                <tr
                  key={index}
                  onContextMenu={(e) => handleRightClick(e, index)}
                >
                  <th>{index + 1}</th>
                  <td>
                    {attempt.total} / {attempt.score} 
                  </td>
                  <td>{attempt.time}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {showContextMenu && (
          <ContextMenu
            locationStyles={{ x: xAxis, y: yAxis }}
            attemptItemRef={attemptItemRef}
            id={deleteId}
            show={showContextMenu}
            showCallback={handleSettingContextMenuState}
            removeItem={deleteFromHistory}
          ></ContextMenu>
        )}
      </div>
    </div>
  );
}
