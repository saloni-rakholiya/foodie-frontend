import "../styles/album.css";
import Navbar from "../components/navbar";
import useSWR from "swr";
import { fetcher } from "../utils";

const About = () => {
  const { data: isAuth, error: authError } = useSWR(
    "http://localhost:3001/checkauth",
    fetcher
  );
  if (!isAuth) {
    return <h1>Loading</h1>;
  }
  if (authError) {
    return <h1>Error</h1>;
  }
  return (
    <>
      <Navbar isAdmin={isAuth.isAdmin} isLoggedIn={isAuth.status} />
      <h1>ABOUT</h1>
      <p style={{ color: "white" }}>
        Foodie is a world class restaurant, famous for its pizzas and known
        highly for its great and fast online service. Started by a group of
        friends, they ensure both offline and online service is equally
        incredible. At Foodie, customers come first!
      </p>
    </>
  );
};

export default About;
