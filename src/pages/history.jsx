import Navbar from "../components/navbar";
import "../styles/album.css";
import useSWR from "swr";
import { fetcher } from "../utils";
import { useNavigate } from "react-router";

const History = () => {
  const { data: isAuth, error: authError } = useSWR(
    "http://localhost:3001/checkauth",
    fetcher
  );
  const navigate = useNavigate();
  if (!isAuth) {
    return <h1>Loading</h1>;
  }
  if (!isAuth.status) {
    navigate("/");
  }
  return (
    <>
      <Navbar isLoggedIn={isAuth.status} isAdmin={isAuth.isAdmin} />
      <h1>HISTORY</h1>
      <p style={{ color: "white" }}>Historyryry</p>
    </>
  );
};

export default History;
