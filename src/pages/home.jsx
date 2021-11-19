import useSWR from "swr";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart } from "../features/cart/cart-slice";

const HomePage = () => {
  const thisStyle = {
    fontFamily: "Raleway, sans-serif",
    fontSize: "18px",
    paddingRight: "20px",
  };
  const fetcher = async (url) => {
    const res = await fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  };
  const dispatch = useAppDispatch();
  const { data, error } = useSWR("http://localhost:3001/getproducts", fetcher);
  if (error) {
    return <h1>Error</h1>;
  }
  if (!data) {
    return <h1>Loading</h1>;
  }
  const handleClick = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <>
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
          <a
            className="navbar-brand"
            href="/home"
            id="companyName"
            style={{ color: "#E7F3FF", fontFamily: "Raleway, sans-serif" }}
          >
            <b>
              <i
                className="fa fa-heartbeat"
                style={{ paddingRight: "7px" }}
                aria-hidden="true"
              ></i>
              Foodie
            </b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="fa fa-navicon" style={{ fontSize: "30px" }}></i>
            </span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ marginRight: "5%" }}
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/cart" style={thisStyle}>
                  Cart
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact" style={thisStyle}>
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/history" style={thisStyle}>
                  History
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about" style={thisStyle}>
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/logout" style={thisStyle}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>

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
                            <button
                              type="button"
                              id={_id}
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleClick(product)}
                            >
                              Add to cart
                            </button>
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
