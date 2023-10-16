import { AuthProvider } from '@galvanize-inc/jwtdown-for-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupForm from './pages/Signup/SignupForm';
import LoginForm from './pages/Login/LoginForm';
import Nav from './components/Navbar';
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home/Home";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <BrowserRouter>
    <Nav />
    <div className="container"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products/:product_id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
