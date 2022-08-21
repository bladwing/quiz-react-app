import { Link } from "react-router-dom";
import NotFoundPhoto from "../assets/img/404.png";

export default function NotFoundPage() {
  return (
    <div className="notFoundPageContainer">
        <img src={NotFoundPhoto} alt="404" />
      <h1>Page not found</h1>
      <h2>
        Please back to <Link to="/">Main page</Link>
      </h2>
    </div>
  );
}
