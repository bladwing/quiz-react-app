import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function History() {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const tmpAttempts = JSON.parse(localStorage.getItem("attempts") || []);
    setAttempts(tmpAttempts);
  }, []);

  return (
    <div>
      <div>
        <h2>შედეგების ისტორია</h2>
        <table>
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

      <Link to="/" className="button2">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        მთავარი
      </Link>
    </div>
  );
}
