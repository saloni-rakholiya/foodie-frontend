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
        to="/"
        id="companyName"
        style={{ color: "#E7F3FF", fontFamily: "Raleway, sans-serif" }}
      >
        <b>
          <i
            className="fa fa-cutlery"
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
          {isLoggedIn ? (
            <li className="nav-item">
              <Link className="nav-link" to="/home" style={thisStyle}>
                Menu
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/publicmenu" style={thisStyle}>
                Menu
              </Link>
            </li>
          )}
          {isLoggedIn ? (
            <li className="nav-item">
              <Link className="nav-link" to="/cart" style={thisStyle}>
                Cart
              </Link>
            </li>
          ) : (
            <></>
          )}
          {isLoggedIn ? (
            <li className="nav-item">
              <Link className="nav-link" to="/buildpizza" style={thisStyle}>
                Build Your Own Pizza
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
          {isLoggedIn ? (
            <li
              className="nav-item nav-link"
              onClick={async () => {
                await fetcher("http://localhost:3001/logout");
                navigate("/", { state: { message: "Logged out" } });
              }}
              style={thisStyle}
              type="button"
            >
              Logout
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login" style={thisStyle}>
                Login
              </Link>
            </li>
          )}
          {isAdmin ? (
            <li className="nav-item">
              <div className="dropdown">
                <div
                  className="nav-link"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={thisStyle}
                  type="button"
                >
                  Admin Actions
                </div>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <Link className="nav-item nav-link text-dark text-center" to="/admin">
                    All Orders
                  </Link>
                  <Link className="nav-item nav-link text-dark text-center" to="/addItem">
                    Add Item
                  </Link>
                  <Link className="nav-item nav-link text-dark text-center" to="/edit">
                    Edit Item
                  </Link>
                </div>
              </div>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
