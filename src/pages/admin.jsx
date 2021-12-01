import Navbar from "../components/navbar";
import useSWR from "swr";
import { fetcher } from "../utils";
import "../styles/album.css";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loader";
import { useState, useEffect } from "react";

const Admin = () => {
  const navigate = useNavigate();

  const changeStatus = async (index, id, status) => {
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
      const res =
        status == "prep"
          ? "Preparing"
          : status == "on"
          ? "On the Way"
          : "Delivered";
      const new_all = all.slice(0, index).concat(res, all.slice(index + 1));
      setAll(new_all);
    } catch (err) {
      console.log(err);
    }
    // const json = await res.json();
    // console.log(json);
  };
  const [all, setAll] = useState([]);
  const [query, setQuery] = useState("");
  const { data: isAuth, error: authError } = useSWR(
    "http://localhost:3001/checkauth",
    fetcher
  );
  const { data: orders, error: productError } = useSWR(
    "http://localhost:3001/allOrders",
    fetcher
  );
  useEffect(() => {
    if (orders) {
      setAll(
        orders.orders.map((x) => {
          if (x.preparing) return "Preparing";
          if (x.ontheway) return "On the Way";
          return "Delivered";
        })
      );
    }
  }, [orders]);
  useEffect(() => {
    if (isAuth) {
      if (!isAuth.status) {
        navigate("/login", { state: { message: "Not logged in" } });
      } else if (!isAuth.isAdmin) {
        navigate("/home", { state: { message: "Not an admin" } });
      }
    }
  }, [isAuth]);
  if (!isAuth) {
    return <Loading />;
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
      <div className="d-flex justify-content-center m-2 input-group">
        <div className="form-outline w-50">
          <input
            type="search"
            placeholder="Search"
            className="form-control"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="album py-5 bg-dark">
        <h1 style={{ color: "white" }}>
          {" "}
          <b>Admin Page</b>
        </h1>
        <div className="container bg-dark">
          <ul className="list-group">
            {orders.orders
              .filter((order) => {
                if (
                  query === "" ||
                  order._id.toLowerCase().includes(query.toLowerCase())
                )
                  return order;
              })
              .map((order, ind) => {
                console.log(order);
                console.log(ind);
                return (
                  <li className="list-group-item m-3">
                    <div
                      className="card-text"
                      data-toggle="collapse"
                      data-target={`#a${ind}`}
                      // aria-controls="1"
                      type="button"
                    >
                      <p className="m-1" style={{ color: "#6D6D6D" }}>
                        <small>{order._id}</small>
                      </p>
                      <h4>View full order!</h4>
                    </div>
                    <div className="row justify-content-center align-items-center">
                      {["Preparing", "On the Way", "Delivered"].map(
                        (status) => (
                          <div
                            className={`d-flex m-2 justify-content-center card-text ${
                              all[ind] == status ? "bg-success" : "bg-danger"
                            }`}
                            style={thisStyle}
                          >
                            <div className="d-flex flex-column justify-content-center">
                              {status}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className="dropdown m-3">
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
                          onClick={() => changeStatus(ind, order._id, "prep")}
                        >
                          Preparing
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => changeStatus(ind, order._id, "on")}
                        >
                          On the way
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => changeStatus(ind, order._id, "del")}
                        >
                          Delivered
                        </button>
                      </div>
                    </div>
                    <div className="collapse" id={`a${ind}`}>
                      {Object.entries(order.cart.items).map(([key, c]) => {
                        // console.log(key, c);

                        const { title } = c.item;
                        return (
                          <div className="col m-auto">
                            <div className="card mb-4 box-shadow">
                              <div
                                className="card-body"
                                style={{ backgroundColor: "#D9D9D9" }}
                              >
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
