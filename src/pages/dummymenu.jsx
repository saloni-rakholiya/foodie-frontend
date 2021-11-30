import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cart from "../models/cart";
import Navbar from "../components/navbar";
import useSWR from "swr";
import { fetcher } from "../utils";
import Loading from "../components/loader";

const DummyMenu = () => {
  const { data: isAuth, error: authError } = useSWR(
    "http://localhost:3001/checkauth",
    fetcher
  );
  const [cart, setCart] = useState(new Cart());
  useEffect(() => {
    if (isAuth) {
      const cart = localStorage.getItem(`cart_${isAuth.id}`);
      if (cart) {
        setCart(JSON.parse(cart));
      }
    }
  }, [isAuth]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState(0);
  const { data, error } = useSWR("http://localhost:3001/getproducts", fetcher);
  if (error) {
    return <h1>Error</h1>;
  }
  if (!isAuth) {
    return <Loading />;
  }
  if (!data) {
    return <Loading />;
  }

  let categories = data.products
    .map(({ category }) => category)
    .filter((value, index, self) => self.indexOf(value) === index);
  categories.unshift("All");
  // console.log(isAuth);

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
                          <p className="card-text">
                            <b>{title}</b>
                          </p>
                          <p className="card-text">{description}</p>
                          <p className="card-text">
                            <b>{"Rs." + price}</b>
                          </p>
                          <p className="card-text">{category}</p>
                          <p style={{color:"red"}}><small>You need to login to order!</small></p>
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

export default DummyMenu;
