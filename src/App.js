import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Quiz from "./components/Quiz";
import "./style/buttons.scss";

export default function App() {
  return (
    <div className="App">
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
    <div>
      <h1> გამოცადე შენი წოდნა JavaScript - ში</h1>

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
const History = () => {
  return (
    <div>
      <h1> შედეგები</h1>

      <Link to="/" className="button2">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        მთავარი გვერდი
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
