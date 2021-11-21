import "../styles/album.css";

const History =()=>{
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
    <h1>HISTORY</h1>
	<p style={{color:"white"}}>Historyryry</p>
     </>
    );
}

export default History;