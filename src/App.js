import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginPage />} />
          <Route path="/register" exact element={<RegisterPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
