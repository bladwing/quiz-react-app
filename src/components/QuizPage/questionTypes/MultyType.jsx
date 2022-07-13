import React, { useState } from "react";

export default function MultiType(props) {
  const [isCorrect, setIsCorrect] = useState(null);
  const [selected, setSelected] = useState([]);
  const [confirm, setConfirm] = useState(false);

  const selectAnswer = (id) => {
    if (!confirm) {
      if (selected.includes(id + 1)) {
        let choosed = [...selected];
        let index = choosed.indexOf(id + 1);
        if (index !== -1) {
          choosed.splice(index, 1);
        }
        setSelected(choosed);
      } else {
        const choosed = [...selected, id + 1];
        setSelected(choosed);
      }
    }
  };

  const arrayCompare = (_arr1, _arr2) => {
    if (
      !Array.isArray(_arr1) ||
      !Array.isArray(_arr2) ||
      _arr1.length !== _arr2.length
    ) {
      return false;
    }

    const arr1 = _arr1.concat().sort();
    const arr2 = _arr2.concat().sort();

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  };

  const handleConfirm = () => {
    setConfirm(true);
    if (arrayCompare(selected, props.answer.answer)) {
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
                (isCorrect === true && selected.some((el) => el - 1 === index)
                  ? "correct"
                  : isCorrect === false &&
                    selected.some((el) => el - 1 === index)
                  ? "wrong"
                  : selected.some((el) => el - 1 === index)
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
      {!confirm && !!selected.length && (
        <button
          className="button2"
          onClick={() => handleConfirm()}
          disabled={!selected}
        >
          დადასტურება
        </button>
      )}
      {confirm && (
        <button className="button2" onClick={() => props.onClick()}>
          შემდეგი
        </button>
      )}
    </div>
  );
}
