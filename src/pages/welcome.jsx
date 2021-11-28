import Navbar from "../components/navbar";
import "../styles/welcome.css";
import useSWR from "swr";
import { fetcher } from "../utils";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loader";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { data: isAuth, error: authError } = useSWR(
    "http://localhost:3001/checkauth",
    fetcher
  );
  if (authError) {
    return <h1>Error</h1>;
  }
  if (!isAuth) {
    return <Loading />;
  }
  if (isAuth.status === false) {
    navigate("/");
  }
  if (!isAuth) {
    return <Loading />;
  }
  return (
    <>
      <Navbar isAdmin={isAuth.isAdmin} isLoggedIn={true} />
      <div class="container">
        <div class="row">
          <div class="col">
            <article class="contain">
              <section class="pizza-hover">
                <div class="pizza-box">
                  <div class="pizza-box-side left-side"></div>
                  <div class="pizza-box-side right-side"></div>
                  <div class="pizza-box-side front-side"></div>
                  <div class="pizza-box-side back-side"></div>
                  <div class="lid">
                    <span>PIZZA</span>
                  </div>
                  <div class="lid-underside"></div>
                  <div class="pizza">
                    <div class="sauce">
                      <div class="toppings">
                        <div class="mozzarella"></div>
                        <div class="mushroom"></div>
                        <div class="mozzarella"></div>
                        <div class="basil"></div>
                        <div class="mozzarella"></div>
                        <div class="basil"></div>
                        <div class="mushroom"></div>
                        <div class="mozzarella"></div>
                        <div class="mushroom"></div>
                        <div class="mozzarella"></div>
                        <div class="basil"></div>
                        <div class="mozzarella"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </article>
          </div>

          <div class="col text-center p-5">
            <h1 className="foodieheading m-5">FOODIE</h1>
            <p className="foodielittleheading">An Oasis Of Pleasure </p>
            <a href="/" class="">
              Get started!
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
