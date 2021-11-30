import Navbar from "../components/navbar";
import "../styles/album.css";
import useSWR from "swr";
import { fetcher } from "../utils";
import { useNavigate } from "react-router";
import Loading from "../components/loader";

const History = () => {
  const { data: isAuth, error: authError } = useSWR(
    "http://localhost:3001/checkauth",
    fetcher
  );
  const navigate = useNavigate();
  const { data, error } = useSWR(
    "http://localhost:3001/getprevorders",
    fetcher
  );
  if (error) {
    return <h1>Error</h1>;
  }
  if (!isAuth) {
    return <Loading />;
  }
  if (isAuth.status === false) {
    navigate("/login");
  }
  if (!data) {
    return <Loading />;
  }

  return (
    <>
      <Navbar isLoggedIn={isAuth.status} isAdmin={isAuth.isAdmin} />
      <h1 className="mt-2">Previous orders</h1>
      <div className="album py-5" style={{ backgroundColor: "#212529" }}>
        <div className="container">
          <div className="row">
            {data.products.map((product) => {
              const {
                _id,
                user,
                cart,
                date,
                time,
                preparing,
                ontheway,
                delivered,
                address,
                name,
                paymentId,
              } = product;
              // console.log(product);
              return (
                <div className="col-12 m-1">
                  <div className="card mb-4 box-shadow">
                    <div className="card-body" style={{backgroundColor:"#FADBD8 "}}>
                      <h3 style={{color:"#E74C3C"}}><i class="fa fa-bell" style={{color:"#E74C3C"}} aria-hidden="true"></i> Order</h3>
                      <p className="card-text">{date}</p>
                      <h3 className="card-text">{time}</h3>
                      <p className="card-text">{address}</p>
                      {preparing && (
                        <h4 className="card-text" style={{ color: "#FF0202" }}>
                          Preparing!{" "}
                          <i
                            class="fa fa-cutlery"
                            style={{ color: "black" }}
                            aria-hidden="true"
                          ></i>
                        </h4>
                      )}
                      {ontheway && (
                        <h4 className="card-text" style={{ color: "#EDB701" }}>
                          On the way!{" "}
                          <i
                            class="fa fa-truck"
                            style={{ color: "black" }}
                            aria-hidden="true"
                          ></i>
                        </h4>
                      )}
                      {delivered && (
                        <h4 className="card-text" style={{ color: "#66AA33" }}>
                          Delivered!{" "}
                          <i
                            class="fa fa-credit-card-alt"
                            style={{ color: "black" }}
                            aria-hidden="true"
                          ></i>
                        </h4>
                      )}
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          type="button"
                          class="btn btn-dark"
                          data-toggle="modal"
                          data-target={"#exampleModal" + _id}
                        >
                          See complete order
                        </button>
                        <div
                          class="modal fade"
                          id={"exampleModal" + _id}
                          tabindex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div
                            class="modal-dialog modal-dialog-centered"
                            role="document"
                          >
                            <div class="modal-content" style={{backgroundColor:"#317873"}}>
                              <div class="modal-header" style={{backgroundColor:"#317873"}}>
                                <h5 class="modal-title" id="exampleModalLabel" style={{backgroundColor:"#317873"}}>
                                  Order details
                                </h5>
                                <button
                                  type="button"
                                  class="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div style={{backgroundColor:"#317873"}} class="modal-body">
                                {console.log(_id, cart.items)}
                                <h1 style={{color:"white"}}> <b>{cart.totalQty} items</b></h1>
                                <h1 style={{color:"white"}}><b>Total bill: {cart.totalPrice}</b></h1>
                                <p>
                                  {Object.entries(cart.items).map((each) => {
                                    return (
                                      <>
                                        <div className="card text-white mb-3">
                                          <div className="card-body row">
                                            <div className="text-center m-auto mt-1">
                                              <p><b>{each[1].item.title}</b></p>
                                              <p>Quantity: {each[1].qty}</p>
                                              <img
                                                src={each[1].item.imagePath}
                                                alt="Food Item"
                                                width="95%"
                                              />
                                              <p>
                                                {"Rs. " + each[1].item.price+ " each"}
                                              </p>
                                             
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })}
                                </p>
                              </div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
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
  );
};

export default History;
