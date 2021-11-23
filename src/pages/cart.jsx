import "../styles/cart.css";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { fetcher } from "../utils";
import useSWR from "swr";

const Cart = () => {
  const { data, error } = useSWR("http://localhost:3001/checkauth", fetcher);
  const navigate = useNavigate();
  if (!data) {
    return <h1>Loading</h1>;
  }
  if (!data.status) {
    navigate("/");
  }
  return (
    <>
      <Navbar isAdmin={data.isAdmin} isLoggedIn={true} />
      <h2 className="text-center">My Cart</h2>

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
                  <Link to="#" className="btn btn-default p-0">
                    <span>
                      <i
                        className="fa fa-plus-square fa-flag-pos"
                        style={{ fontSize: "30px" }}
                      ></i>
                    </span>
                  </Link>
                  <Link to="#" className="btn btn-default p-0 m-1">
                    <span>
                      <i
                        className="fa fa-minus-square fa-flag"
                        style={{ fontSize: "30px" }}
                      ></i>
                    </span>
                  </Link>
                </div>

                <div className="col-3 text-center">
                  <button type="button" className="btn btn-default m-2">
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

      <button className="button m-2 btn-primary">Checkout</button>
    </>
  );
};

export default Cart;
