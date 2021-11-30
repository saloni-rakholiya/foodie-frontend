import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { fetcher } from "../utils";
import useSWR from "swr";
import Loading from "../components/loader";
import React from "react";

const SuccessCheckoutPage = () => {
  const { data, error } = useSWR("http://localhost:3001/checkauth", fetcher);
  const navigate = useNavigate();

  if (error) {
    return <h1>Error</h1>;
  }

  if (!data) {
    return <Loading />;
  }
  if (!data.status) {
    navigate("/login");
  }

  return (
    <>
      <Navbar isAdmin={data.isAdmin} isLoggedIn={true} />
      <h1 className="m-5 p-5" style={{ color: "white", fontSize: "50px" }}>
        Successfully Placed Order!
      </h1>

      <a href="/history" className="m-5" style={{ color: "white" }}>
        {" "}
        <i>Check out all your orders! </i>
      </a>
    </>
  );
};

export default SuccessCheckoutPage;
