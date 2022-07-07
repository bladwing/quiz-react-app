import React, { useState, useEffect } from "react";
import { ApiQuizDB } from "../connectors/ApiConector";
import { getWithExpiry, setWithExpiry} from "../utils/LocalStorage"


import { Rings } from "react-loader-spinner";
import { Progress } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
 
export default function Quiz(props) {
  const [data, setData] = useState({ questions: [], answers: [] });
  const [isCorrect, setIsCorrect] = useState(null);
  const [selected, setSelected] = useState(null);
  const [confirm, setConfirm] = useState(false);



  useEffect(() => {
    const getData = async () => {
      const tempData = ApiQuizDB;
      setWithExpiry("data", tempData, 1000);
      setData({
        questions: getWithExpiry("data").questions,
        answers: getWithExpiry("data").answers,
      });
    };
    setWithExpiry("data")
      ? setData({
          questions: getWithExpiry("data").questions,
          answers: getWithExpiry("data").answers,
        })
      : getData();
  }, []);
  const selectAnswer = (id) => {
    if (!confirm) {
      setSelected(id + 1);
    }
  };
  
  return (
    <div>
  
      {props.question.option.map((option, index) => (
        <div
          key={option.id}
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
         
        </div>
      ))}
    </div>
  );
}
