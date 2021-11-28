import Navbar from "../components/navbar";
import useSWR from "swr";
import { fetcher } from "../utils";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loader";

const Admin = () => {
  const navigate = useNavigate();
  const changeStatus = async (id, status) => {
    try {
      await fetch("http://localhost:3001/changeStatus", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ id, status }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (err) {
      console.log(err);
    }
    // const json = await res.json();
    // console.log(json);
  };
  const { data: isAuth, error: authError } = useSWR(
    "http://localhost:3001/checkauth",
    fetcher
  );
  const { data: orders, error: productError } = useSWR(
    "http://localhost:3001/allOrders",
    fetcher
  );
  if (!isAuth) {
    return <Loading />;
  }
  if (!isAuth.status) {
    navigate("/");
  }
  if (!isAuth.isAdmin) {
    navigate("/home");
  }
  if (!orders) {
    return <Loading />;
  }
  if (productError) {
    return <h1>Error</h1>;
  }
  const thisStyle = {
    borderRadius: "50%",
    height: "80px",
    width: "80px",
  };
  return (
    <>
      <Navbar isAdmin={true} isLoggedIn={true} />
      <div className="album py-5 bg-light">
        <div className="container">
          <ul className="list-group">
            {orders.orders.map((order, ind) => {
              return (
                <li className="list-group-item">
                  <div
                    className="card-text"
                    data-toggle="collapse"
                    data-target={`#a${ind}`}
                    // aria-controls="1"
                    type="button"
                  >
                    ORDER ID: {order._id}
                  </div>
                  <div className="row d-flex justify-content-between">
                    {["Preparing", "On the Way", "Delivered"].map((status) => (
                      <div
                        className={`d-flex justify-content-center card-text ${
                          order[
                            {
                              Preparing: "preparing",
                              "On the Way": "ontheway",
                              Delivered: "delivered",
                            }[status]
                          ]
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                        style={thisStyle}
                      >
                        <div className="d-flex flex-column justify-content-center">
                          {status}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Change Status
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => changeStatus(order._id, "prep")}
                      >
                        Preparing
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => changeStatus(order._id, "on")}
                      >
                        On the way
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => changeStatus(order._id, "del")}
                      >
                        Delivered
                      </button>
                    </div>
                  </div>
                  <div className="collapse" id={`a${ind}`}>
                    {Object.entries(order.cart.items).map(([key, c]) => {
                      console.log(key, c);

                      const { title } = c.item;
                      return (
                        <div className="col-md-4">
                          <div className="card mb-4 box-shadow">
                            <div className="card-body">
                              <p className="card-text">{title}</p>
                              <p className="card-text">Qty: {c.qty}</p>
                              <p className="card-text">Price: {c.price}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Admin;
