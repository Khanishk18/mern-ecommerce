import React, { useState } from "react";
import API, { setAuthToken } from "../api/api";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      const token = res.data.token;
      const user = res.data.user;

      setAuthToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful!");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3" style={{maxWidth: "400px"}}>
        <input className="form-control" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="form-control" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
