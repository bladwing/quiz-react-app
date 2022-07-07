import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
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

      setWithExpiry("data", tempData, 1000);
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

  return !questions.length ? (
    <div className="page">
      <Rings color="#FFB03B" height={150} width={150} />
    </div>
  ) : (
    <div className="page">
      <Questions
        question={questions[currentQuestionId]}
        answer={answers[currentQuestionId]}
      ></Questions>
    </div>
  );
}
