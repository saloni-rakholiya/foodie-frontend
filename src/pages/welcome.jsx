import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import "../styles/welcome.css";
import useSWR from "swr";
import { fetcher } from "../utils";
import { useLocation } from "react-router-dom";
import Loading from "../components/loader";
import { useEffect } from "react";
import { toast } from "react-toastify";

const WelcomePage = () => {
  const { data: isAuth, error: authError } = useSWR(
    "http://localhost:3001/checkauth",
    fetcher
  );
  const location = useLocation();
  useEffect(() => {
    if (location.state)
      toast.info(location.state.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
  }, [location]);
  if (authError) {
    return <h1>Error</h1>;
  }
  if (!isAuth) {
    return <Loading />;
  }
  return (
    <>
      <Navbar isAdmin={isAuth.isAdmin} isLoggedIn={isAuth.status} />
      <div className="container">
        <div className="row">
          <div className="col">
            <article className="contain">
              <section className="pizza-hover">
                <div className="pizza-box">
                  <div className="pizza-box-side left-side"></div>
                  <div className="pizza-box-side right-side"></div>
                  <div className="pizza-box-side front-side"></div>
                  <div className="pizza-box-side back-side"></div>
                  <div className="lid">
                    <span>PIZZA</span>
                  </div>
                  <div className="lid-underside"></div>
                  <div className="pizza">
                    <div className="sauce">
                      <div className="toppings">
                        <div className="mozzarella"></div>
                        <div className="mushroom"></div>
                        <div className="mozzarella"></div>
                        <div className="basil"></div>
                        <div className="mozzarella"></div>
                        <div className="basil"></div>
                        <div className="mushroom"></div>
                        <div className="mozzarella"></div>
                        <div className="mushroom"></div>
                        <div className="mozzarella"></div>
                        <div className="basil"></div>
                        <div className="mozzarella"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </article>
          </div>

          <div className="col text-center p-5">
            <h1 className="foodieheading m-5">FOODIE</h1>
            <p className="foodielittleheading">An Oasis Of Pleasure </p>
            <Link to="/login" className="">
              Get started!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
