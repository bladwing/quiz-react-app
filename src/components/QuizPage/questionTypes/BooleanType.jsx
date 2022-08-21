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
      <h3 className="questionTitle">{props.question.question}</h3>
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
            <span> True </span>
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
            <span>False</span>
          </div>
        </div>
      </div>
      {!confirm && selected !== null && (
        <button className="button2" onClick={() => handleConfirm()}>
          Confirm
        </button>
      )}
      {confirm && (
        <button className="button2" onClick={() => props.onClick()}>
          Next
        </button>
      )}
    </div>
  );
}
