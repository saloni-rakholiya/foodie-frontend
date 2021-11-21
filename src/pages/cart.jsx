import "../styles/cart.css";
import Navbar from "../components/navbar";

const Cart = () => {
  return (
    <>
      <Navbar />
      <h2 class="text-center">My Cart</h2>

      <div class="card w-75 container">
        <div class="card-body row">
          <div class="col-3 text-center m-auto mt-1">
            <img
              src="https://www.jquery-az.com/html/images/banana.jpg"
              alt="Food Item"
              width="95%"
            />
          </div>
          <div class="col-6">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              With supporting text below as a natural lead-in to additional
              contentWith supporting text below as a natural lead-in to
              additional content With supporting text below as a natural lead-in
              to additional contentWith supporting text below as a natural
              lead-in to additional content With supporting text below as a
              natural lead-in to additional content With supporting text below
              as a natural lead-in to additional content.
            </p>
            <a href="#" class="btn btn-default p-0">
              <span>
                <i
                  class="fa fa-plus-square fa-flag-pos"
                  style={{ fontSize: "30px" }}
                ></i>
              </span>
            </a>
            <a href="#" class="btn btn-default p-0 m-1">
              <span>
                <i
                  class="fa fa-minus-square fa-flag"
                  style={{ fontSize: "30px" }}
                ></i>
              </span>
            </a>
          </div>

          <div class="col-3 text-center">
            <button type="button" class="btn btn-default m-2">
              <span>
                <i class="fa fa-trash fa-flag" style={{ fontSize: "40px" }}></i>
              </span>
            </button>
            <h5 class="text-center">1</h5>
            <p class="text-center">Rs. 500</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

