import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import { Rings } from "react-loader-spinner";
import { Progress } from "reactstrap";
import { setWithExpiry, getWithExpiry } from "../../utils/LocalStorage";
import { questionData } from "../../api/ApiConector";

import SingleType from "./questionTypes/SingleType";
import MultiType from "./questionTypes/MultyType";
import BooleanType from "./questionTypes/BooleanType";
import Popup from "../Popup/Popup";

import PictureQuiz from "../../assets/img/quiz.png";
import "./quiz.scss";

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
        <div className="ScorePage">
          <img src={PictureQuiz} alt="quiz" className="PictureQuiz" />
          <div className="scoreContainer">
            <h2>საბოლო შედეგი</h2>
            <h3>
              სულ კითხვა:{" "}
              <span className="scoreNumberBlue">{questions.length}</span>
            </h3>
            <h3>
              სწორი პასუხი: <span className="scoreNumberGreen">{score} </span>
            </h3>
          </div>
          <div className="ScoreButton">
            <Popup value={score} total={questions.length} />
          </div>
        </div>
      )}

      <div className="ProgressContainer">
        <Progress
          color="warning"
          value={(currentQuestionId / questions.length) * 100}
        >
          <div className="Progress"> {currentQuestionId * 12.5}%</div>
        </Progress>
        
      </div>
      <Link to="/" className="button2">მთავარი გვერდი</Link>
    </div>
  );
}
