import React, { useState, useEffect } from "react";
import API, { setAuthToken } from "../api/api";
import 'bootstrap/dist/css/bootstrap.min.css';

const Order = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await API.get("/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item.product === product._id);
    if (existing) {
      setCart(cart.map(item => item.product === product._id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { product: product._id, name: product.name, qty: 1, price: product.price }]);
    }
  };

  const placeOrder = async () => {
    if (!shippingAddress) return alert("Enter shipping address");
    if (cart.length === 0) return alert("Cart is empty");

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    try {
      const res = await API.post("/orders", { orderItems: cart, shippingAddress, totalPrice });
      alert("Order placed successfully! Order ID: " + res.data._id);
      setCart([]);
      setShippingAddress("");
    } catch (err) {
      alert(err.response?.data?.message || "Error placing order");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Place Order</h2>

      <div className="row">
        <div className="col-md-6">
          <h3>Products</h3>
          {products.map(p => (
            <div key={p._id} className="card mb-2 p-2">
              <strong>{p.name}</strong> - ₹{p.price}
              <button className="btn btn-sm btn-success ms-2" onClick={() => addToCart(p)}>Add to Cart</button>
            </div>
          ))}
        </div>

        <div className="col-md-6">
          <h3>Cart</h3>
          {cart.map(item => (
            <div key={item.product}>
              {item.name} x {item.qty} = ₹{item.price * item.qty}
            </div>
          ))}
          <input className="form-control mt-2" placeholder="Shipping Address" value={shippingAddress} onChange={e => setShippingAddress(e.target.value)} />
          <button className="btn btn-primary mt-2" onClick={placeOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Order;
