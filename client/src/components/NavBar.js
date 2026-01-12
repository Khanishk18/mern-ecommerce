import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">MERN Store</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          {user && <li className="nav-item"><Link className="nav-link" to="/order">Order</Link></li>}
          {user && user.isAdmin && <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>}
        </ul>
        <ul className="navbar-nav ms-auto">
          {!user && (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
            </>
          )}
          {user && (
            <>
              <li className="nav-item nav-link">Welcome, {user.name}</li>
              <li className="nav-item">
                <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
