import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useSWR from "swr";
import Navbar from "../components/navbar";
import Cart from "../models/cart";
import Loading from "../components/loader";

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
  const [clicked, setClicked] = useState(false);
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
    setClicked(true);
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
    if (!json.status) {
      setClicked(false);
    } else {
      if (!localStorage.getItem(`cart_${json.id}`)) {
        localStorage.setItem(`cart_${json.id}`, JSON.stringify(new Cart()));
      }
      navigate("/home");
    }
    // console.log(json);
  };
  if (error) return <h1>Error</h1>;
  if (!data) return <Loading />;
  if (data.status) {
    if (!localStorage.getItem(`cart_${data.id}`)) {
      localStorage.setItem(`cart_${data.id}`, JSON.stringify(new Cart()));
    }
    navigate("/home");
  }
  if (clicked) {
    return <Loading />;
  }

  return (
    <>
      <body>
        <Navbar />
        <h3 className="text-center mt-5" style={{color:"white"}}>Login</h3>

        <div>
          <form
            onSubmit={submitForm}
            className="align-items-center text-center"
          >
            <div className="form-row text-center text-center">
              <div className="form-group col-md-6 text-center m-auto p-2">
                <label for="username" style={{color:"white"}}>Email</label>
                <input
                  type="email"
                  className="form-control mb-3"
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
                <label for="password" style={{color:"white"}}>Password</label>
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

          <p className="text-center" style={{color:"white"}}>
            Don't Have an Account? <Link to="/register" style={{color:"#88DDFF"}}>Click Here</Link> to
            Create One!
          </p>
        </div>
      </body>
    </>
  );
};

export default LoginPage;
