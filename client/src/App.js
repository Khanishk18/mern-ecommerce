import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Order from "./pages/Order";
import Signup from "./pages/Signup";  // ✅ add signup page
import NavBar from "./components/NavBar"; // ✅ import navbar

function App() {
  return (
    <Router>
      <NavBar />   {/* ✅ show navbar always */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />  {/* ✅ add route */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;
