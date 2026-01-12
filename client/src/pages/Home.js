import React, { useEffect, useState } from "react";
import API from "../api/api";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await API.get("/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Products</h2>
      <div className="row">
        {products.map(p => (
          <div className="col-md-4 mb-4" key={p._id}>
            <div className="card h-100">
              <img src={p.image} className="card-img-top" alt={p.name} />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
                <p className="card-text fw-bold">₹{p.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
