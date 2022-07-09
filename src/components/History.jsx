import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/history.scss";

export default function History() {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const attempts = JSON.parse(localStorage.getItem("Attempts")) || [];
    localStorage.setItem("Attempts", JSON.stringify(attempts));
    const tmpAttempts = JSON.parse(localStorage.getItem("Attempts") || []);
    setAttempts(tmpAttempts);
  }, []);

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
              <th>lvl</th>
              <th>შედეგი</th>
              <th>თარიღი</th>
            </tr>
          </thead>
          <tbody>
            {attempts.length > 0 &&
              attempts.map((attempt, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    {attempt.score} / {attempt.total}
                  </td>
                  <td>{attempt.time}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
