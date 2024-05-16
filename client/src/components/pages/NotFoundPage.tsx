import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center row">
        <div className=" col-md-6">
          <img src="404.jpg" alt="" className="img-fluid" />
        </div>
        <div className=" col-md-6 mt-5">
          <p className="fs-3">
            {" "}
            <span className="text-danger">Opps!</span> Page not found.
          </p>
          <p className="lead">The page you’re looking for doesn’t exist.</p>
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
