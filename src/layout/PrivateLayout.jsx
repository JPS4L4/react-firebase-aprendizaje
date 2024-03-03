import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";

const Private = () => {
  const { user } = useUserContext();

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default Private;
