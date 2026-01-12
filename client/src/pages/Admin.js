import React, { useState } from "react";
import API from "../api/api";
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/products", {
        name,
        price,
        description: "Sample Product",
        image: "https://via.placeholder.com/150",
        category: "Men",
        sizes: ["S", "M", "L"],
        countInStock: 10,
      });
      alert("Product created: " + res.data.name);
      setName("");
      setPrice("");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating product");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin - Create Product</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3" style={{maxWidth: "400px"}}>
        <input className="form-control" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input className="form-control" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
        <button className="btn btn-primary" type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default Admin;
