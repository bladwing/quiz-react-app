import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="notFoundPageContainer">
        <img src="./404.png" alt="404" />
      <h1>Page not found</h1>
      <h2>
        Please back to <Link to="/">Main page</Link>
      </h2>
    </div>
  );
}
