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
  if (data) {
    const new_cart = localStorage.getItem(`cart_${data.id}`);
    if (new_cart) {
      setCart(JSON.parse(new_cart));
    }
  }

  return (
    <>
      <Navbar isAdmin={data.isAdmin} isLoggedIn={true} />
      <h1 style={{ color: "white" }}>Hello</h1>
    </>
  );
};

export default CheckoutPage;
