import "../styles/cart.css";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Cart from "../models/cart";
import { useNavigate } from "react-router-dom";
import { fetcher } from "../utils";
import useSWR from "swr";

const CartPage = () => {
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
    return <h1>Loading</h1>;
  }
  if (!data.status) {
    navigate("/");
  }

  const deleteItem = (product) => {
    const id = product._id;
    const newCart = { ...cart };
    newCart.items[id].price = 0;
    newCart.totalQty -= newCart.items[id].qty;
    newCart.totalPrice -= newCart.items[id].item.price * newCart.items[id].qty;
    newCart.items[id].qty = 0;
    delete newCart.items[id];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleClick = (product) => {
    const newCart = { ...cart };
    newCart.totalQty += 1;
    let storedItem = newCart.items[product._id];
    if (!storedItem) {
      storedItem = newCart.items[product._id] = {
        item: product,
        qty: 0,
        price: 0,
      };
    }
    newCart.items[product._id].qty++;
    newCart.items[product._id].price =
      newCart.items[product._id].item.price * newCart.items[product._id].qty;
    newCart.totalPrice += product.price;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeClick = (product) => {
    const id = product._id;
    const newCart = { ...cart };
    newCart.items[id].qty--;
    newCart.items[id].price -= newCart.items[id].item.price;
    newCart.totalQty--;
    newCart.totalPrice -= newCart.items[id].item.price;

    if (newCart.items[id].qty <= 0) {
      delete newCart.items[id];
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const checkoutcart = async () => {
    const res = await fetch("http://localhost:3001/checkout", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(JSON.parse(localStorage.getItem("cart"))),
    });
    const json = await res.json();
    console.log(json);
    localStorage.setItem("cart", JSON.stringify(new Cart()));
    setCart(new Cart());
  };
  return (
    <>
      <Navbar isAdmin={data.isAdmin} isLoggedIn={true} />
      {cart.totalQty > 0 && (
        <h2 className="text-center" style={{ color: "white" }}>
          My Cart
        </h2>
      )}

      {cart.totalQty <= 0 && (
        <h1 className="text-center m-5" style={{ color: "white" }}>
          Cart is empty!
        </h1>
      )}

      {Object.entries(JSON.parse(localStorage.getItem("cart")).items).map(
        (each) => {
          return (
            <div className="card w-75 container">
              <div className="card-body row">
                <div className="col-3 text-center m-auto mt-1">
                  <img
                    src={each[1].item.imagePath}
                    alt="Food Item"
                    width="95%"
                  />
                </div>
                <div className="col-6">
                  <h5 className="card-title">{each[1].item.title}</h5>
                  <p className="card-text">{each[1].item.description}</p>
                  <button
                    onClick={() => handleClick(each[1].item)}
                    className="btn btn-default p-0"
                  >
                    <span>
                      <i
                        className="fa fa-plus-square fa-flag-pos"
                        style={{ fontSize: "30px" }}
                      ></i>
                    </span>
                  </button>
                  <button
                    onClick={() => removeClick(each[1].item)}
                    className="btn btn-default p-0 m-1"
                  >
                    <span>
                      <i
                        className="fa fa-minus-square fa-flag"
                        style={{ fontSize: "30px" }}
                      ></i>
                    </span>
                  </button>
                </div>

                <div className="col-3 text-center">
                  <button
                    onClick={() => deleteItem(each[1].item)}
                    type="button"
                    className="btn btn-default m-2"
                  >
                    <span>
                      <i
                        className="fa fa-trash fa-flag"
                        style={{ fontSize: "40px" }}
                      ></i>
                    </span>
                  </button>
                  <h5 className="text-center">{each[1].qty}</h5>
                  <p className="text-center">{"Rs. " + each[1].item.price}</p>
                </div>
              </div>
            </div>
          );
        }
      )}
      {cart.totalQty > 0 && (
        <div style={{ color: "white" }}>
          Total items number: {cart.totalQty}
        </div>
      )}
      {cart.totalQty > 0 && (
        <div style={{ color: "white" }}>Total price: {cart.totalPrice}</div>
      )}
      {cart.totalQty > 0 && (
        <button
          onClick={() => {
            checkoutcart();
          }}
          className="btn btn-primary p-2 m-4"
        >
          Checkout
        </button>
      )}
    </>
  );
};

export default CartPage;
