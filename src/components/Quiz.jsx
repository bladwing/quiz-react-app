import React, { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { Progress } from "reactstrap";
import { Link } from "react-router-dom";
import { setWithExpiry, getWithExpiry } from "../utils/LocalStorage";
import { questionData } from "../connectors/ApiConector";
import "../style/questionsArea.scss";
import SingleType from "./questionTypes/SingleType";
import MultiType from "./questionTypes/MultyType";
import BooleanType from "./questionTypes/BooleanType";

export default function Quiz() {
  const [data, setData] = useState({ questions: [], answers: [] });
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const { questions, answers } = data;
  const [score, setScore] = useState(0);

  useEffect(() => {
    const getQuestions = async () => {
      const tempData = await questionData();
      setWithExpiry("Questions", tempData, 50000);
      setData({
        questions: getWithExpiry("Questions").questions,
        answers: getWithExpiry("Questions").answers,
      });
    };
    getWithExpiry("Questions")
      ? setData({
          questions: getWithExpiry("Questions").questions,
          answers: getWithExpiry("Questions").answers,
        })
      : getQuestions();
  }, []);

  const handleNext = () => {
    setCurrentQuestionId(currentQuestionId + 1);
  };

  const handleSetScore = (newScore) => {
    setScore(newScore);
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
            score={score}
            newScore={handleSetScore}
          ></SingleType>
        ) : questions[currentQuestionId].type === "multiple" ? (
          <MultiType
            question={questions[currentQuestionId]}
            answer={answers[currentQuestionId]}
            onClick={handleNext}
            score={score}
            newScore={handleSetScore}
          ></MultiType>
        ) : (
          <BooleanType
            question={questions[currentQuestionId]}
            answer={answers[currentQuestionId]}
            onClick={handleNext}
            score={score}
            newScore={handleSetScore}
          ></BooleanType>
        )
      ) : (
        <div className="final-page">
          <div className="score-container">
            <h3>საბოლო შემდეგი:</h3>
            <h4>სწორი პასუხი: {score} </h4>
            <h4>სულ კითხვა: {questions.length}</h4>
          </div>

          <Link to="/" className="button2">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            მთავარი
          </Link>
          <Link to="/" className="button2">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            ტესტის გამეორება
          </Link>
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
