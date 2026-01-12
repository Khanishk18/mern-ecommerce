import React, { useState } from "react";
import API, { setAuthToken } from "../api/api";
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password });
      const token = res.data.token;
      const user = res.data.user;

      setAuthToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Signup successful! You are now logged in.");
      window.location.href = "/";
    } catch (err) {
      alert("Signup failed: " + err.response?.data?.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3" style={{maxWidth: "400px"}}>
        <input className="form-control" type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input className="form-control" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="form-control" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="btn btn-success" type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
