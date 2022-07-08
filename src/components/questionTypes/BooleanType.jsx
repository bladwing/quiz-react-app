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

  return (
    <div className="questionContainer">
      <div className="questions">
        <h2>{props.question.question}</h2>
        this is boolean...
        <button className="button2" onClick={() => props.onClick()}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          შემდეგი
        </button>
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
