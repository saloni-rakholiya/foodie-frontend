import "../styles/album.css";
import Navbar from "../components/navbar";
import useSWR from "swr";
import { fetcher } from "../utils";
import Loading from "../components/loader";

const About = () => {
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
      <Navbar isAdmin={isAuth.isAdmin} isLoggedIn={isAuth.status} />
      <h1 className="mt-2 mb-2">ABOUT</h1>
      <div id="carouselExampleControls" class="m-auto carousel slide w-50" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="https://img.grouponcdn.com/deal/2JtNGwxgAFUrGJ22tFxdLtCFpMrW/2J-2048x1229/v1/c870x524.jpg" alt="First slide"/>
      <div class="carousel-caption d-none d-md-block">
    <h5>FOODIE!</h5>
    <p style={{color:"white"}}>At ur footstep ,the haven of flavours</p>
  </div>
   
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="https://thumbs.dreamstime.com/b/salmon-arugula-pizza-light-tasty-restaurant-meal-foodie-108642271.jpg" alt="Second slide"/>
      <div class="carousel-caption d-none d-md-block">
    <h5>Best Service</h5>
    <p style={{color:"white"}}> Unbeatable prices and offers that u cant resist </p>
  </div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="https://miro.medium.com/max/1400/0*oTfm1pTXLxitHHFy.jpg" alt="Third slide"/>
      <div class="carousel-caption d-none d-md-block">
    <h5>Best Quality</h5>
    <p style={{color:"white"}}>Made with freshest ingredients from sustainable local farms</p>
  </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

      <p className="ml-auto mr-auto p-4 w-50 customimg" style={{ color: "white" }}>
        Foodie is a world class restaurant, famous for its pizzas and known
        highly for its great and fast online service. Started by a group of
        friends, they ensure both offline and online service is equally
        incredible. At Foodie, customers come first!
      </p>
    </>
  );
};

export default About;
