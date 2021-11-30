import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import Navbar from "../components/navbar";
import Loading from "../components/loader";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    if(!json.status){
      toast.error("User already exists!", {
        position: toast.POSITION.BOTTOM_LEFT
      });
    }
    else{
    navigate("/login");
    }
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
                required
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
                required
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
                required
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
                required
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
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* <p style={{ color: "#a1aeca" }}>Password strength: {(password.length>=6 && password.match(/^(?=.*[a-zA-Z])(?=.*[0-9])/)!=null)?<span style={{ color: "#449900" }}>Strong</span>:<span style={{ color: "red" }}>Weak</span>}</p> */}

              <p style={{ color: "#a1aeca" }}>Password strength: {
              (password.length>=6 && password.match(/^(?=.*[a-zA-Z])(?=.*[0-9])/)!=null && password.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)!=null)?
              <span style={{ color: "#449900" }}>Strong</span>
              :((password.length>=6 && password.match(/^(?=.*[a-zA-Z])(?=.*[0-9])/)!=null)?
              <span style={{ color: "blue" }}>Medium</span>:
              <span style={{ color: "red" }}>Weak</span>)
              }
              </p>

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
        <ToastContainer/>
      </body>
    </>
  );
};

export default RegisterPage;
