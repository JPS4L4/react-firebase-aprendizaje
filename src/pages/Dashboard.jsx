import { Button } from "@mui/material";
import { logout } from "../config/firebase";

const Dashboard = () => {
  const HandleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Dashboard (ruta protegida)</h1>
      <Button variant="contained" onClick={HandleLogOut}>Log Out</Button>
    </>
  );
};

export default Dashboard;
