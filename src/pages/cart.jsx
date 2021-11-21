import "../styles/cart.css";

const Cart =()=>{
    const thisStyle = {
    fontFamily: "Raleway, sans-serif",
    fontSize: "18px",
    paddingRight: "20px",
  };
  
    return (
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


        <h2 class="text-center">My Cart</h2>

	<div class="card w-75 container">
	  <div class="card-body row">
		<div class="col-3 text-center m-auto mt-1">
		<img src="https://www.jquery-az.com/html/images/banana.jpg" alt="Food Item" width="95%"/>
		</div>
		<div class="col-6">
	    <h5 class="card-title">Card title</h5>
	    <p class="card-text">With supporting text below as a natural lead-in to additional contentWith supporting text below as a natural lead-in to additional content With supporting text below as a natural lead-in to additional contentWith supporting text below as a natural lead-in to additional content With supporting text below as a natural lead-in to additional content With supporting text below as a natural lead-in to additional content.</p>
	    <a href="#" class="btn btn-default p-0">
			<span><i class="fa fa-plus-square fa-flag-pos" style={{fontSize: "30px"}}></i></span>
		</a>
		<a href="#" class="btn btn-default p-0 m-1">
			<span><i class="fa fa-minus-square fa-flag" style={{fontSize: "30px"}}></i></span>
		</a>
		</div>

		<div class="col-3 text-center">
	    <button type="button" class="btn btn-default m-2">  
		<span><i class="fa fa-trash fa-flag" style={{fontSize:"40px"}}></i></span>
        </button>
		<h5 class="text-center">1</h5>
		<p class="text-center">Rs. 500</p>
		</div>
	  </div>
	</div>


     </>
    );
}

export default Cart;