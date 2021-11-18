import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  // return <h1>Hello</h1>;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userName, password }),
      credentials: "include",
    });
    const json = await res.json();
    console.log(json);
  };
  return (
    <>
      <body>
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
          <a
            className="navbar-brand"
            href="/home"
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
          </a>
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
                <a
                  className="nav-link"
                  href="/cart"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontSize: "18px",
                    paddingRight: "20px",
                  }}
                >
                  Cart
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/contact"
                  style={{
                    paddingRight: "20px",
                    fontFamily: "Raleway, sans-serif",
                    fontSize: "18px",
                  }}
                >
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/history"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    paddingRight: "20px",
                    fontSize: "18px",
                  }}
                >
                  History
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/about"
                  style={{
                    paddingRight: "20px",
                    fontSize: "18px",
                    fontFamily: "Raleway, sans-serif",
                  }}
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/logout"
                  style={{
                    paddingRight: "10px",
                    fontSize: "18px",
                    fontFamily: "Raleway, sans-serif",
                    paddingRight: "20px",
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <h3 className="text-center">Login</h3>

        <div>
          <form
            onSubmit={submitForm}
            className="align-items-center text-center"
          >
            <div className="form-row text-center text-center">
              <div className="form-group col-md-6 text-center m-auto p-2">
                <label for="username">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Email"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-row text-center">
              <div className="form-group col-md-6 text-center m-auto p-2">
                <label for="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-dark m-1">
              Sign in
            </button>
          </form>

          <p className="text-center">
            Don't Have an Account? <Link to="/register">Click Here</Link> to
            Create One!
          </p>
        </div>
      </body>
    </>
  );
};

export default LoginPage;
