import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { Progress } from "reactstrap";
import { setWithExpiry, getWithExpiry } from "../utils/LocalStorage";
import { questionData } from "../connectors/ApiConector";
import Questions from "./Questions";

export default function Quiz() {
  const [data, setData] = useState({ questions: [], answers: [] });
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const { questions, answers } = data;

  useEffect(() => {
    const getData = async () => {
      const tempData = await questionData();

      setWithExpiry("data", tempData, 50000);
      setData({
        questions: getWithExpiry("data").questions,
        answers: getWithExpiry("data").answers,
      });
    };
    getWithExpiry("data")
      ? setData({
          questions: getWithExpiry("data").questions,
          answers: getWithExpiry("data").answers,
        })
      : getData();
  }, []);

  const handleNext = () => {
    setCurrentQuestionId(currentQuestionId + 1);
  };

  return !questions.length ? (
    <div className="page">
      <Rings color="#007FFF" height={200} width={200} />
    </div>
  ) : (
    <div className="page">
      <Questions
        question={questions[currentQuestionId]}
        answer={answers[currentQuestionId]}
        onClick={handleNext}
      ></Questions>

      <div className="ProgressContainer">
        <Progress
          className="Progress"
          color="success"
          value={(currentQuestionId / questions.length) * 100}
        >
          {currentQuestionId}/{questions.length}
        </Progress>
      </div>
    </div>
  );
}
