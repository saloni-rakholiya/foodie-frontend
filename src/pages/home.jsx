import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cart from "../models/cart";
import Navbar from "../components/navbar";
import useSWR from "swr";
import { fetcher } from "../utils";

const HomePage = () => {
  const { data: isAuth, error: authError } = useSWR(
    "http://localhost:3001/checkauth",
    fetcher
  );
  const navigate = useNavigate();
  const [cart, setCart] = useState(new Cart());
  const [filter, setFilter] = useState(0);
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);
  const { data, error } = useSWR("http://localhost:3001/getproducts", fetcher);
  if (error) {
    return <h1>Error</h1>;
  }
  if (!isAuth) {
    return <h1>Loading</h1>;
  }
  if (isAuth.status === false) {
    navigate("/");
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
  let categories = data.products
    .map(({ category }) => category)
    .filter((value, index, self) => self.indexOf(value) === index);
  categories.unshift("All");
  console.log(isAuth);

  return (
    <>
      <>
        <Navbar isAdmin={isAuth.isAdmin} isLoggedIn={isAuth.status} />
        <div className="d-flex bg-light pt-3 pb-3 justify-content-start">
          {categories.map((category, ind) => {
            return (
              <span
                className={`d-flex mr-2 ml-2 p-2 badge badge-pill btn ${
                  ind === filter ? "badge-primary" : ""
                }`}
                onClick={() => {
                  setFilter(ind);
                }}
              >
                {category}
              </span>
            );
          })}
        </div>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              {data.products
                .filter((product) => {
                  if (categories[filter] === "All") return product;
                  if (product.category === categories[filter]) return product;
                })
                .map((product) => {
                  const {
                    _id,
                    imagePath,
                    title,
                    description,
                    price,
                    category,
                  } = product;
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
