import React from "react";
import { Link } from "react-router-dom";

export default function TryAgain(props) {
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

  return (
    <div className="ScoreButton">
      <Link to="/history" className="button2" onClick={saveAttempt}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        შედეგების ისტორია
      </Link>
      <Link to="/quiz" onClick={{}} className="button2">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        ტესტის გამეორება
      </Link>
    </div>
  );
}
