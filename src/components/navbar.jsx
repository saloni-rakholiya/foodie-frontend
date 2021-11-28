import { Link } from "react-router-dom";
import { fetcher } from "../utils";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAdmin = false, isLoggedIn = false }) => {
  const thisStyle = {
    fontFamily: "Raleway, sans-serif",
    fontSize: "18px",
    paddingRight: "20px",
  };

  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <Link
        className="navbar-brand"
        to="/welcome"
        id="companyName"
        style={{ color: "#E7F3FF", fontFamily: "Raleway, sans-serif" }}
      >
        <b>
          <i
            className="fa fa-heartbeat"
            style={{ paddingRight: "7px" }}
            aria-hidden="true"
          ></i>
          Foodie
        </b>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon">
          <i className="fa fa-navicon" style={{ fontSize: "30px" }}></i>
        </span>
      </button>
      <div
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
        style={{ marginRight: "5%" }}
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/home" style={thisStyle}>
              Menu
            </Link>
          </li>
          {isLoggedIn ? (
            <li className="nav-item">
              <Link className="nav-link" to="/cart" style={thisStyle}>
                Cart
              </Link>
            </li>
          ) : (
            <></>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/contact" style={thisStyle}>
              Contact
            </Link>
          </li>
          {isLoggedIn ? (
            <li className="nav-item">
              <Link className="nav-link" to="/history" style={thisStyle}>
                History
              </Link>
            </li>
          ) : (
            <></>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/about" style={thisStyle}>
              About
            </Link>
          </li>
          {isAdmin ? (
            <li className="nav-item">
              <Link className="nav-link" to="/admin" style={thisStyle}>
                Admin Page
              </Link>
            </li>
          ) : (
            <></>
          )}
          {isLoggedIn ? (
            <li
              className="nav-item nav-link"
              onClick={async () => {
                await fetcher("http://localhost:3001/logout");
                navigate("/");
              }}
              style={thisStyle}
            >
              Logout
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/" style={thisStyle}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
