import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { Progress } from "reactstrap";
import { setWithExpiry, getWithExpiry } from "../utils/LocalStorage";
import { questionData } from "../connectors/ApiConector";
import "../style/questionsArea.scss";
import SingleType from "./SingleType";
import MultiType from "./MultyType";
import BooleanType  from "./BooleanType";

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
    <div className="Loading">
      <Rings color="#007FFF" height={250} width={250} />
    </div>
  ) : (
    <div>
            {currentQuestionId < questions.length ? (
        questions[currentQuestionId].type === "single" ? (
          <SingleType
            question={questions[currentQuestionId]}
            answer={answers[currentQuestionId]}
            onClick={handleNext}
          ></SingleType>
        ) : questions[currentQuestionId].type === "multiple" ? (
          <MultiType
            question={questions[currentQuestionId]}
            answer={answers[currentQuestionId]}
            onClick={handleNext}
          ></MultiType>
        ) : (
          <BooleanType
            question={questions[currentQuestionId]}
            answer={answers[currentQuestionId]}
            onClick={handleNext}
          ></BooleanType>
        )
      ) : (
        <div className="final-page">
          <div className="score-container">
            <h3>საბოლო შემდეგი:</h3>
          </div>
     
        </div>
      )}


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
