    import React from "react";
    import { NavLink } from "react-router-dom";
    import { useUserContext } from "../context/UserContext";
    import { logout } from "../config/firebase";

    const Navbar = () => {
    const { user } = useUserContext();

    const handleLogOut = async () => {
        try {
        await logout();
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
            {user ? (
            <>
                <div className="d-flex justify-content-end">
                <NavLink to="/dashboard" className="btn btn-outline-success m-2">
                    Dashboard
                </NavLink>

                <button
                    className="btn btn-outline-danger m-2"
                    onClick={handleLogOut}
                >
                    Log out
                </button>
                </div>
            </>
            ) : (
            <>
                <div className="d-flex justify-content-start">
                <NavLink to="/" className="btn btn-outline-primary m-2">
                    Login
                </NavLink>
                <NavLink to="/register" className="btn btn-outline-success m-2">
                    Register
                </NavLink>
                </div>
            </>
            )}
        </div>
        </nav>
    );
    };

    export default Navbar;
