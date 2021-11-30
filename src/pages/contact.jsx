import Navbar from "../components/navbar";
import "../styles/contact.css";
import useSWR from "swr";
import { fetcher } from "../utils";
import Loading from "../components/loader";
import ReactToolTip from "react-tooltip";

const Contact = () => {
  const { data: isAuth, error: authError } = useSWR(
    "http://localhost:3001/checkauth",
    fetcher
  );
  if (!isAuth) {
    return <Loading />;
  }
  if (authError) {
    return <h1>Error</h1>;
  }
  return (
    <>
      <Navbar isLoggedIn={isAuth.status} isAdmin={isAuth.isAdmin} />
      <div>
        <h1 className="text-center" style={{ color: "white" }}>
          Contact Us
        </h1>

        <div className="container">
          <div className="map-container">
            <img src="http://res.cloudinary.com/slzr/image/upload/v1500321012/world-map-1500_vvekl5.png" />
            <div
              className="point venezuela tippy"
              data-tip="<p className='text-center' style='color:white'>Foodie Venz</br>+1234567890</p>"
              data-for="a_1"
              data-html={true}
            ></div>
            <div
              className="point brasil tippy"
              data-tip="<p className='text-center' style='color:white'>Foodie Hub Brasil </br>+1234567890</p>"
              data-html={true}
              data-for="a_2"
            ></div>
            <div
              className="point argentina tippy"
              data-tip="<p className='text-center' style='color:white'>Foodie argenti-club </br>+1234567890</p>"
              data-html={true}
              data-for="a_3"
            ></div>
            <div
              className="point mexico tippy"
              data-tip="<p className='text-center' style='color:white'>Mexicano foodies </br>+1234567890</p>"
              data-html={true}
              data-for="a_3"
            ></div>
            <div
              className="point usa tippy"
              data-tip="<p className='text-center' style='color:white'>Estados Unidos Foodie</br>+1234567890</p>"
              data-html={true}
              data-for="a_4"
            ></div>
            <div
              className="point arabia tippy"
              data-tip="<p className='text-center' style='color:white'>Foodie Cave</br>+1234567890</p>"
              data-html={true}
              data-for="a_5"
            ></div>
            <div
              className="point turquia tippy"
              data-tip="<p className='text-center' style='color:white'>Foodie Turquía</br>+1234567890</p>"
              data-html={true}
              data-for="a_6"
            ></div>
            <div
              className="point rusia tippy"
              data-tip="<p className='text-center' style='color:white'>Foodie Russos</br>+1234567890</p>"
              data-html={true}
              data-for="a_7"
            ></div>
            <div
              className="point china tippy"
              data-tip="<p className='text-center' style='color:white'>China-Foodie</br>+1234567890</p>"
              data-html={true}
              data-for="a_8"
            ></div>
            <div
              className="point japon tippy"
              data-tip="<p className='text-center' style='color:white'>Japon</br>+1234567890</p>"
              data-html={true}
              data-for="a_9"
            ></div>
          </div>
        </div>
      </div>
      <ReactToolTip id="a_1" />
      <ReactToolTip id="a_2" />
      <ReactToolTip id="a_3" />
      <ReactToolTip id="a_4" />
      <ReactToolTip id="a_5" />
      <ReactToolTip id="a_6" />
      <ReactToolTip id="a_7" />
      <ReactToolTip id="a_8" />
      <ReactToolTip id="a_9" />
    </>
  );
};

export default Contact;
