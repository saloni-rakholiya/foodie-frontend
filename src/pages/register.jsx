import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submitForm = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, name, city, state, password }),
    });
    const json = await res.json();
    console.log(json);
    navigate("/");
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
        <h3 className="text-center">Register</h3>

        <form className="align-items-center text-center" onSubmit={submitForm}>
          <div className="form-row text-center">
            <div className="form-group col-md-12">
              <label for="name">Name</label>
              <input
                type="name"
                className="form-control"
                id="name"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row text-center">
            <div className="form-group col-md-12">
              <label for="city">City</label>
              <input
                type="city"
                className="form-control"
                id="city"
                name="city"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row text-center">
            <div className="form-group col-md-12">
              <label for="state">State</label>
              <input
                type="state"
                className="form-control"
                id="state"
                name="state"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row text-center">
            <div className="form-group col-md-12">
              <label for="username">Email</label>
              <input
                type="email"
                className="form-control"
                id="username"
                name="username"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row text-center">
            <div className="form-group col-md-12">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>

        <p className="text-center">
          Already Have an Account? <Link to="/">Click Here</Link> to Login!
        </p>
      </body>
    </>
  );
};

export default RegisterPage;
