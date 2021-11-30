import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import Navbar from "../components/navbar";
import Loading from "../components/loader";

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
    // console.log(json);
    navigate("/login");
  };
  const { data, error } = useSWR("http://localhost:3001/checkauth", (url) =>
    fetch(url, {
      mode: "cors",
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => {
        return { status: false };
      })
  );

  if (!data) {
    return <Loading />;
  }
  // console.log(data.status);
  if (data.status) {
    navigate("/home", {
      // state: {
      //   message: "Already logged in. Redirecting",
      // },
    });
  }

  return (
    <>
      <body>
        <Navbar />
        <h3 className="text-center" style={{ color: "white" }}>
          Register
        </h3>

        <form className="align-items-center text-center" onSubmit={submitForm}>
          <div className=" w-50 form-row text-center m-auto">
            <div className="form-group col-md-12">
              <label for="name" style={{ color: "white" }}>
                Name
              </label>
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

          <div className="w-50 form-row text-center m-auto">
            <div className="form-group col-md-12">
              <label for="city" style={{ color: "white" }}>
                City
              </label>
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

          <div className="w-50 form-row text-center m-auto">
            <div className="form-group col-md-12">
              <label for="state" style={{ color: "white" }}>
                State
              </label>
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

          <div className="w-50 form-row text-center m-auto">
            <div className="form-group col-md-12">
              <label for="username" style={{ color: "white" }}>
                Email
              </label>
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

          <div className="w-50 form-row text-center m-auto">
            <div className="form-group col-md-12">
              <label for="password" style={{ color: "white" }}>
                Password
              </label>
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

          <button type="submit" className="btn btn-dark">
            Register
          </button>
        </form>

        <p className="text-center" style={{ color: "white" }}>
          Already Have an Account?{" "}
          <Link to="/" style={{ color: "#88DDFF" }}>
            Click Here
          </Link>{" "}
          to Login!
        </p>
      </body>
    </>
  );
};

export default RegisterPage;
