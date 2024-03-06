import { Outlet } from "react-router-dom";
import UserContextProvider from "../context/UserContext";

const Root = () => {
  return (
    <UserContextProvider>
      <div>
        <Outlet />
      </div>
    </UserContextProvider>
  );
};

export default Root;
