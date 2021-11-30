import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Cart from "../models/cart";
import { useNavigate } from "react-router-dom";
import { fetcher } from "../utils";
import useSWR from "swr";
import Loading from "../components/loader";
import React from "react";

const CheckoutPage = () => {
  const [radiostate, setRadiostate] = useState(0);
  const [textstate, setTextstate] = useState("");
  const { data, error } = useSWR("http://localhost:3001/checkauth", fetcher);
  const { data: data2, error: err } = useSWR(
    "http://localhost:3001/getuserdets",
    fetcher
  );

  useEffect(() => {
    if (data2) setTextstate(data2.user.city + " ," + data2.user.state);
    if (data) {
      const cart = JSON.parse(localStorage.getItem(`cart_${data.id}`));
      console.log(cart.items);
      if (JSON.stringify(cart.items) === JSON.stringify({})) navigate("/home");
    }
  }, [data2, data]);

  const navigate = useNavigate();
  if (!data) {
    return <Loading />;
  }
  if (!data.status) {
    navigate("/login");
  }

  if (!data2) {
    return <Loading />;
  }

  const checkoutcart = async () => {
    console.log(textstate);

    const res = await fetch("http://localhost:3001/checkout", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        currcart: JSON.parse(localStorage.getItem(`cart_${data.id}`)),
        curaddress: textstate,
      }),
    });
    const json = await res.json();
    console.log(json);
    localStorage.setItem(`cart_${data.id}`, JSON.stringify(new Cart()));
    navigate("/successful");
  };

  const ch = (e) => {
    setTextstate(e.target.value);
  };
  return (
    <>
      <Navbar isAdmin={data.isAdmin} isLoggedIn={true} />
      <h1 className="m-2" style={{ color: "white" }}>
        Checkout Page
      </h1>

      <h4 className="mb-3" style={{ color: "white" }}>
        Payment
      </h4>

      <div className="d-block my-3">
        <div className="custom-control custom-radio">
          <input
            id="credit"
            name="paymentMethod"
            type="radio"
            className="custom-control-input"
            onClick={() => setRadiostate(0)}
            checked
            required
          />
          <label
            className="custom-control-label"
            for="credit"
            style={{ color: "white" }}
          >
            Credit card
          </label>
        </div>
        <div className="custom-control custom-radio">
          <input
            id="debit"
            name="paymentMethod"
            type="radio"
            className="custom-control-input"
            onClick={() => setRadiostate(1)}
            required
          />
          <label
            className="custom-control-label"
            for="debit"
            style={{ color: "white" }}
          >
            Debit card
          </label>
        </div>
        <div className="custom-control custom-radio">
          <input
            id="paypal"
            name="paymentMethod"
            type="radio"
            className="custom-control-input"
            onClick={() => setRadiostate(2)}
            required
          />
          <label
            className="custom-control-label"
            for="paypal"
            style={{ color: "white" }}
          >
            Cash on delivery
          </label>
        </div>
      </div>

      {(radiostate == 0 || radiostate == 1) && (
        <>
          <div className="row m-5">
            <div className="col-md-6 mb-3">
              <label for="cc-name" style={{ color: "white" }}>
                Name on card
              </label>
              <input
                type="text"
                className="form-control"
                id="cc-name"
                placeholder=""
                required
              />
              <small className="text-muted" style={{ color: "white" }}>
                Full name as displayed on card
              </small>
              <div className="invalid-feedback" style={{ color: "white" }}>
                Name on card is required
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label for="cc-number" style={{ color: "white" }}>
                Credit card number
              </label>
              <input
                type="text"
                className="form-control"
                id="cc-number"
                placeholder=""
                required
              />
              <div className="invalid-feedback" style={{ color: "white" }}>
                Credit card number is required
              </div>
            </div>
          </div>
          <div className="row m-5">
            <div className="col-md-6 mb-6">
              <label for="cc-expiration" style={{ color: "white" }}>
                Expiration
              </label>
              <input
                type="text"
                className="form-control"
                id="cc-expiration"
                placeholder=""
                required
              />
              <div className="invalid-feedback" style={{ color: "white" }}>
                Expiration date required
              </div>
            </div>
            <div className="col-md-6 mb-6">
              <label for="cc-expiration" style={{ color: "white" }}>
                CVV
              </label>
              <input
                type="text"
                className="form-control"
                id="cc-cvv"
                placeholder=""
                required
              />
              <div className="invalid-feedback" style={{ color: "white" }}>
                Security code required
              </div>
            </div>
          </div>
        </>
      )}
      <div className="row m-5">
        <div className="col-md-12 mb-12">
          <label for="cc-expiration" style={{ color: "white" }}>
            Address
          </label>
          <input
            onChange={ch}
            value={textstate}
            type="text"
            className="form-control"
            id="addressbox"
            placeholder=""
            required
          />
          <div className="invalid-feedback" style={{ color: "white" }}>
            Address required
          </div>
        </div>
      </div>

      <button
        className="btn m-2"
        style={{ backgroundColor: "#88DDFF" }}
        onClick={checkoutcart}
      >
        Checkout
      </button>
    </>
  );
};

export default CheckoutPage;
