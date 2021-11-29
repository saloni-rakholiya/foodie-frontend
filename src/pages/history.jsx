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
    navigate("/");
  }
  if (!data) {
    return <Loading />;
  }

  console.log(data);
  return (
    <>
      <Navbar isLoggedIn={isAuth.status} isAdmin={isAuth.isAdmin} />
      <h1>Previous orders</h1>
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
              return (
                <div className="col-12 m-2">
                  <div className="card mb-4 box-shadow">
                    <div className="card-body">
                      <h3>Order</h3>
                      <p className="card-text">{date}</p>
                      <h3 className="card-text">{time}</h3>
                      <p className="card-text">{address}</p>
                      {preparing && <h4 className="card-text" style={{color:"#FF0202"}}>Preparing! <i class="fa fa-cutlery" style={{color:"black"}} aria-hidden="true"></i></h4>}
                      {ontheway && <h4 className="card-text" style={{color:"#EDB701"}}>On the way! <i class="fa fa-truck" style={{color:"black"}} aria-hidden="true"></i></h4>}
                      {delivered && <h4 className="card-text" style={{color:"#66AA33"}}>Delivered! <i class="fa fa-credit-card-alt" style={{color:"black"}} aria-hidden="true"></i></h4>}
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          type="button"
                          class="btn btn-dark"
                          data-toggle="modal"
                          data-target={"#exampleModal"+_id}
                        >
                          See complete order
                        </button>
                        <div
                          class="modal fade"
                          id={"exampleModal"+_id}
                          tabindex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div
                            class="modal-dialog modal-dialog-centered"
                            role="document"
                          >
                            {console.log(cart)}
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
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
                              <div class="modal-body">
                                {/* {console.log(cart)} */}
                                <h3>{cart.totalQty} items</h3>
                                <h3>Total bill: {cart.totalPrice}</h3>
                                <p>
                                  {Object.entries(cart.items).map((each) => {
                                    return (
                                      <>
                                        <div className="card text-white bg-success mb-3">
                                          <div className="card-body row">
                                            <div className="text-center m-auto mt-1">
                                              <p>Quantity: {each[1].qty}</p>
                                              <img
                                                src={each[1].item.imagePath}
                                                alt="Food Item"
                                                width="95%"
                                              />
                                              <p>
                                                {"Rs. " + each[1].item.price}
                                              </p>
                                              <p>{each[1].item.title}</p>
                                              {/* <p>{each[1].item.description}</p> */}
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
