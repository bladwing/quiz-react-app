import React, { useState } from "react";

export default function Boolean(props) {
  const [isCorrect, setIsCorrect] = useState(null);
  const [selected, setSelected] = useState(null);
  const [confirm, setConfirm] = useState(false);

  const handleConfirm = () => {
    setConfirm(true);
    if (selected === props.answer.answer) {
      setIsCorrect(true);
      props.newScore(props.score + 1);
    } else setIsCorrect(false);
  };

  const selectAnswer = (answer) => {
    if (!confirm) {
      setSelected(answer);
    }
  };
  return (
    <div className="questionContainer">
      <h2 className="questionTitle">{props.question.question}</h2>
      <div className="questions">
        <div className="answers">
          <div
            className={
              "singleOption " +
              (isCorrect === true && selected === true
                ? "correct"
                : isCorrect === false && selected === true
                ? "wrong"
                : selected === true
                ? "active "
                : "")
            }
            onClick={() => selectAnswer(true)}
          >
            <span> სიმართლე </span>
          </div>

          <div
            className={
              "singleOption " +
              (isCorrect === true && selected === false
                ? "correct"
                : isCorrect === false && selected === false
                ? "wrong"
                : selected === false
                ? "active "
                : "")
            }
            onClick={() => selectAnswer(false)}
          >
            <span>თყვილი</span>
          </div>
        </div>
      </div>
      {!confirm && selected !== null && (
        <button className="button2" onClick={() => handleConfirm()}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          დადასტურება
        </button>
      )}
      {confirm && (
        <button className="button2" onClick={() => props.onClick()}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          შემდეგი
        </button>
      )}
    </div>
  );
}
