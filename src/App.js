import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Quiz from "./components/QuizPage/Quiz";
import History from "./components/History/History";
import LastScore from "./components/LastScore";

import "./scss/buttons.scss";
import "./App.scss";

import FronEnd from "./assets/img/frontEnd.png";
import NotFoundPage from "./components/NotFoundPage";

export default function App() {
  return (
    <div className="QuizMainContainer">
      <Router>
        <Routes>
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/history" element={<History />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

const Home = () => {
  return (
    <div className="homePage">
      <img src={FronEnd} alt="FrontEnd" className="frontEnd" />
      <h2 className="mainTitle"> Try youself in Front-End</h2>

      <Link to="/quiz" className="button2 startButton">
        Start Test
      </Link>
      <Link to="/history" className="button2 historyButton">
       Results History
      </Link>
      <LastScore />
    </div>
  );
};
