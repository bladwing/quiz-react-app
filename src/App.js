import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Quiz from "./components/Quiz";
import History from "./components/History";
import "./style/buttons.scss";

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
      <h2> გამოცადე შენი წოდნა Front-End - ში</h2>

      <Link to="/quiz" className="button2">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        დაწყება
      </Link>
      <Link to="/history" className="button2">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        შედეგები
      </Link>
    </div>
  );
};