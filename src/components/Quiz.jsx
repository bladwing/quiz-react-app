import React, { useState, useEffect } from "react";
import { Rings } from "react-loader-spinner";
import { Progress } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApiQuizDB } from "../connectors/ApiConector";

export default function Quiz(props) {
  const [isCorrect, setIsCorrect] = useState(null);
  const [selected, setSelected] = useState(null);
  const [confirm, setConfirm] = useState(false);

  const selectAnswer = (id) => {
    if (!confirm) {
      setSelected(id + 1);
    }
  };

  return (
    <div>
      <h1>This is Quiz...</h1>

      {props.question.options.map((option, index) => (
        <div
          key={option}
          className={
            "single-option " +
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

      <Rings />

      <Progress multi>
        <Progress bar color="success" value="30" />
      </Progress>
    </div>
  );
}
