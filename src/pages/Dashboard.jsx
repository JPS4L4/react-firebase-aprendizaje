import { logout } from "../config/firebase";

const Dashboard = () => {
  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <>
      <h1>Dashboard (ruta protegida)</h1>
      <button onClick={handleLogOut}>Log out</button>
    </>
  );
};

export default Dashboard;
