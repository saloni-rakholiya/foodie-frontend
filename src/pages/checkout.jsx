import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Cart from "../models/cart";
import { useNavigate } from "react-router-dom";
import { fetcher } from "../utils";
import useSWR from "swr";
import Loading from "../components/loader";

const CheckoutPage = () => {
  const [cart, setCart] = useState(new Cart());
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);

  const { data, error } = useSWR("http://localhost:3001/checkauth", fetcher);
  const navigate = useNavigate();
  if (!data) {
    return <Loading />;
  }
  if (!data.status) {
    navigate("/");
  }

  return (
    <>
      <Navbar isAdmin={data.isAdmin} isLoggedIn={true} />
      <h1 style={{ color: "white" }}>Hello</h1>
    </>
  );
};

export default CheckoutPage;
