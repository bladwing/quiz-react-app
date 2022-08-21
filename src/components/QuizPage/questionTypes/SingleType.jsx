import React, { useState } from "react";

export default function SingleType(props) {
  const [isCorrect, setIsCorrect] = useState(null);
  const [selected, setSelected] = useState(null);
  const [confirm, setConfirm] = useState(false);

  const selectAnswer = (id) => {
    if (!confirm) {
      setSelected(id + 1);
    }
  };
  const handleConfirm = () => {
    setConfirm(true);
    if (selected === props.answer.answer) {
      setIsCorrect(true);
      props.newScore(props.score + 1);
    } else setIsCorrect(false);
  };
  return (
    <div className="questionContainer">
      <h3 className="questionTitle">{props.question.question}</h3>
      <div className="questions">
        <div className="answers">
          {props.question.options.map((option, index) => (
            <div
              key={option}
              className={
                "singleOption " +
                (isCorrect === true && selected - 1 === index
                  ? "correct"
                  : isCorrect === false && selected - 1 === index
                  ? "wrong"
                  : selected - 1 === index
                  ? "active "
                  : "")
              }
              onClick={() => selectAnswer(index)}
            >
              <span>{option}</span>
            </div>
          ))}
        </div>
      </div>
      {!confirm && selected && (
        <button
          className="button2"
          onClick={() => handleConfirm()}
          disabled={!selected}
        >
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
