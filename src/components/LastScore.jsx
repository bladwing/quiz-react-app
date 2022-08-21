import React from "react";

export default function LastScore() {
  const attempts = JSON.parse(localStorage.getItem("Attempts")) || [];
  const lastAttempt =
    attempts.length > 0
      ? attempts.sort((a, b) => {
          return a.time > b.time ? -1 : 1;
        })[0]
      : null;

  return (
    <div>
      {lastAttempt !== null && (
        <div className="LastScore">
          <div>Last Results:</div>
          <span className="scoreNumberBlue">{lastAttempt.total} </span> /{" "}
          <span className="scoreNumberGreen"> {lastAttempt.score}</span>

          <div className="LastTime">{lastAttempt.time}</div>
        </div>
      )}
    </div>
  );
}
