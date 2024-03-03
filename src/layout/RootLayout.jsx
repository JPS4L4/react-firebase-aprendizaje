import { Outlet } from "react-router-dom";
import UserContextProvider from "../context/UserContext";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <UserContextProvider>
      <Navbar />
      <div className="container p-4 d-flex flex-column">
        <Outlet />
      </div>
    </UserContextProvider>
  );
};

export default Root;
