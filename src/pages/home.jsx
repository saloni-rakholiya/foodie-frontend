import useSWR from "swr";
import { useState, useEffect } from "react";
import Cart from "../models/cart";
import Navbar from "../components/navbar";

const HomePage = () => {
  const fetcher = async (url) => {
    const res = await fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };
  const [cart, setCart] = useState(new Cart());
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    console.log(cart);
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);
  const { data, error } = useSWR("http://localhost:3001/getproducts", fetcher);
  if (error) {
    return <h1>Error</h1>;
  }
  if (!data) {
    return <h1>Loading</h1>;
  }
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
    console.log(newCart);
    setCart(newCart);
    // console.log(cart);
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

  return (
    <>
      <>
        <Navbar />
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              {data.products.map((product) => {
                const { _id, imagePath, title, description, price, category } =
                  product;
                return (
                  <div className="col-md-4">
                    <div className="card mb-4 box-shadow">
                      <img
                        className="card-img-top"
                        src={imagePath}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <p className="card-text">{title}</p>
                        <p className="card-text">{description}</p>
                        <p className="card-text">{price}</p>
                        <p className="card-text">{category}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div id="addToCartButton" className="btn-group">
                            {cart.items[_id] == null ? (
                              <button
                                type="button"
                                id={_id}
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => handleClick(product)}
                              >
                                Add To Cart
                              </button>
                            ) : (
                              <>
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => removeClick(product)}
                                >
                                  {" "}
                                  -{" "}
                                </button>{" "}
                                <p>{cart.items[_id].qty}</p>{" "}
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => handleClick(product)}
                                >
                                  {" "}
                                  +{" "}
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default HomePage;
