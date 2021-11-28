import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import CartPage from "./pages/cart";
import History from "./pages/history";
import Admin from "./pages/admin";
import CheckoutPage from "./pages/checkout";
import WelcomePage from "./pages/welcome";
import AddItem from "./pages/addItem";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginPage />} />
          <Route path="/register" exact element={<RegisterPage />} />
          <Route path="/home" exact element={<HomePage />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/cart" exact element={<CartPage />} />
          <Route path="/history" exact element={<History />} />
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/checkout" exact element={<CheckoutPage />} />
          <Route path="/welcome" exact element={<WelcomePage />} />
          <Route path="/addItem" exact element={<AddItem />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
