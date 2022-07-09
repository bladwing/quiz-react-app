import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Quiz from "./components/Quiz";
import History from "./components/History";
import "./style/buttons.scss";
import FronEnd from "./style/frontEnd.png"

export default function App() {
  return (
    <div className="QuizMainContainer">
      <Router>
        <Routes>
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/history" element={<History />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

const Home = () => {
  return (
    <div className="homePage">
      <img src={FronEnd} alt="FrontEnd" className="frontEnd"/>
      <h2 className="mainTitle"> გამოცადე შენი ცოდნა Front-End - ში</h2>

      <Link to="/quiz" className="button2 startButton">
        ტესტის დაწყება
      </Link>
      <Link to="/history" className="button2 historyButton">
        შედეგების ისტორია
      </Link>
    </div>
  );
};
