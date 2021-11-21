import "../styles/contact.css";

const Contact =()=>{
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
         
         <div>
    <h1 className="text-center" style={{color:"white"}}>Contact Us</h1>

	<div className="container">
  <div className="map-container">
    <img src="http://res.cloudinary.com/slzr/image/upload/v1500321012/world-map-1500_vvekl5.png"/>
    <div className="point venezuela tippy" title="<p className='text-center' style='color:white'>Venezuela</br>+1234567890</p>"></div>
    <div className="point brasil tippy" title="<p className='text-center' style='color:white'>Brasil </br>+1234567890</p>"></div>
    <div className="point argentina tippy" title="<p className='text-center' style='color:white'>Argentina </br>+1234567890</p>"></div>
    <div className="point mexico tippy" title="<p className='text-center' style='color:white'>Mexico </br>+1234567890</p>"></div>
    <div className="point usa tippy" title="<p className='text-center' style='color:white'>Estados Unidos</br>+1234567890</p>"></div>
    <div className="point arabia tippy" title="<p className='text-center' style='color:white'>Arabia Saudi</br>+1234567890</p>"></div>
    <div className="point turquia tippy" title="<p className='text-center' style='color:white'>Turquía</br>+1234567890</p>"></div>     
    <div className="point rusia tippy" title="<p className='text-center' style='color:white'>Rusia</br>+1234567890</p>"></div>
    <div className="point china tippy" title="<p className='text-center' style='color:white'>China</br>+1234567890</p>"></div>
    <div className="point japon tippy" title="<p className='text-center' style='color:white'>Japon</br>+1234567890</p>"></div>
    <div className="point australia tippy" title="<p className='text-center' style='color:white'>Australia</br>+1234567890</p>"></div>
  </div>
</div>
</div>
         </>
    );
}

export default Contact;