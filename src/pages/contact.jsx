import Navbar from "../components/navbar";
import "../styles/contact.css";
import useSWR from "swr";
import { fetcher } from "../utils";

const Contact = () => {
  return (
    <>
      <Navbar/>
      <div>
        <h1 className="text-center" style={{ color: "white" }}>
          Contact Us
        </h1>

        <div className="container">
          <div className="map-container">
            <img src="http://res.cloudinary.com/slzr/image/upload/v1500321012/world-map-1500_vvekl5.png" />
            <div
              className="point venezuela tippy"
              title="<p className='text-center' style='color:white'>Venezuela</br>+1234567890</p>"
            ></div>
            <div
              className="point brasil tippy"
              title="<p className='text-center' style='color:white'>Brasil </br>+1234567890</p>"
            ></div>
            <div
              className="point argentina tippy"
              title="<p className='text-center' style='color:white'>Argentina </br>+1234567890</p>"
            ></div>
            <div
              className="point mexico tippy"
              title="<p className='text-center' style='color:white'>Mexico </br>+1234567890</p>"
            ></div>
            <div
              className="point usa tippy"
              title="<p className='text-center' style='color:white'>Estados Unidos</br>+1234567890</p>"
            ></div>
            <div
              className="point arabia tippy"
              title="<p className='text-center' style='color:white'>Arabia Saudi</br>+1234567890</p>"
            ></div>
            <div
              className="point turquia tippy"
              title="<p className='text-center' style='color:white'>Turquía</br>+1234567890</p>"
            ></div>
            <div
              className="point rusia tippy"
              title="<p className='text-center' style='color:white'>Rusia</br>+1234567890</p>"
            ></div>
            <div
              className="point china tippy"
              title="<p className='text-center' style='color:white'>China</br>+1234567890</p>"
            ></div>
            <div
              className="point japon tippy"
              title="<p className='text-center' style='color:white'>Japon</br>+1234567890</p>"
            ></div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
