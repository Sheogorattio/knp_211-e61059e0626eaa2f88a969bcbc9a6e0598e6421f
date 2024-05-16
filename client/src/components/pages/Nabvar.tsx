import { Link } from "react-router-dom";

export default function Nabvar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            ShopApi
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Registration
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/auth">
                  Authorization
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/list_of_users">
                  List Of Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/createProduct">
                  Add product
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
