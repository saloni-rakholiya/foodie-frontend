import Navbar from "../components/navbar";
import useSWR from "swr";
import { fetcher } from "../utils";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const { data: isAuth, error: authError } = useSWR(
    "http://localhost:3001/checkauth",
    fetcher
  );
  if (!isAuth) {
    return <h1>Loading</h1>;
  }
  if (!isAuth.status) {
    navigate("/");
  }
  if (!isAuth.isAdim) {
    navigate("/home");
  }
  return (
    <>
      <Navbar isAdmin={true} isLoggedIn={true} />
      <h1>Hello</h1>
    </>
  );
};

export default Admin;
