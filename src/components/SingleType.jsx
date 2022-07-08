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
    } else setIsCorrect(false);
  };
  return (
    <div className="questionContainer">
      <div className="questions">
        <h2>{props.question.question}</h2>

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
