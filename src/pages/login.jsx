import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useSWR from "swr";
import Navbar from "../components/navbar";
import Cart from "../models/cart";

const LoginPage = () => {
  // const { state: locationState } = useLocation();
  // if (locationState == null) {
  //   console.log("No state");
  // } else {
  //   console.log(locationState);
  //   delete locationState.message;
  //   console.log(locationState);
  // }
  // return <h1>Hello</h1>;
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const fetcher = async (url) => {
    const res = await fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return res.json();
  };
  const { data, error } = useSWR("http://localhost:3001/checkauth", fetcher);
  // const count = useAppSelector((state) => state.counter.value);
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
  if (error) return <h1>Error</h1>;
  if (!data) return <h1>Loading</h1>;
  if (data.status) {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(new Cart()));
    }
    navigate("/home");
  }

  return (
    <>
      <body>
        <Navbar />
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
