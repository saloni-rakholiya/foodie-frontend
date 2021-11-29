import { useState } from "react";
import Navbar from "../components/navbar";
import Cart from "../models/cart";
import { useNavigate } from "react-router-dom";
import { fetcher } from "../utils";
import useSWR from "swr";
import Loading from "../components/loader";

const CheckoutPage = () => {
  const [cart, setCart] = useState(new Cart());

  const { data, error } = useSWR("http://localhost:3001/checkauth", fetcher);
  const navigate = useNavigate();
  if (!data) {
    return <Loading />;
  }
  if (!data.status) {
    navigate("/");
  }
  // if (data) {
  //   const new_cart = localStorage.getItem(`cart_${data.id}`);
  //   if (new_cart) {
  //     setCart(JSON.parse(new_cart));
  //   }
  // }

  return (
    <>
      <Navbar isAdmin={data.isAdmin} isLoggedIn={true} />
      <h1 className="m-2" style={{ color: "white" }}>Checkout Page</h1>

      <h4 className="mb-3" style={{ color: "white" }}>Payment</h4>

            <div className="d-block my-3">
              <div className="custom-control custom-radio">
                <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked required/>
                <label className="custom-control-label" for="credit" style={{ color: "white" }}>Credit card</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required/>
                <label className="custom-control-label" for="debit" style={{ color: "white" }}>Debit card</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required/>
                <label className="custom-control-label" for="paypal" style={{ color: "white" }}>Cash on delivery</label>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label for="cc-name" style={{ color: "white" }}>Name on card</label>
                <input type="text" className="form-control" id="cc-name" placeholder="" required/>
                <small className="text-muted" style={{ color: "white" }}>Full name as displayed on card</small>
                <div className="invalid-feedback" style={{ color: "white" }}>
                  Name on card is required
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label for="cc-number" style={{ color: "white" }}>Credit card number</label>
                <input type="text" className="form-control" id="cc-number" placeholder="" required/>
                <div className="invalid-feedback" style={{ color: "white" }}>
                  Credit card number is required
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label for="cc-expiration" style={{ color: "white" }}>Expiration</label>
                <input type="text" className="form-control" id="cc-expiration" placeholder="" required/>
                <div className="invalid-feedback" style={{ color: "white" }}>
                  Expiration date required
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label for="cc-expiration" style={{ color: "white" }}>CVV</label>
                <input type="text" className="form-control" id="cc-cvv" placeholder="" required/>
                <div className="invalid-feedback" style={{ color: "white" }}>
                  Security code required
                </div>
              </div>
            </div>
      
    </>
  );
};

export default CheckoutPage;
