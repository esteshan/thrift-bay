import { AuthProvider } from '@galvanize-inc/jwtdown-for-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupForm from './pages/Signup/SignupForm';
import LoginForm from './pages/Login/LoginForm';
import Nav from './components/Navbar';
import ProductDetail from "./components/ProductDetail";
import UserProfile from './components/UserProfile';
import Home from "./components/Home";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <div className="container">
      <BrowserRouter basename={basename}>
        <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<SignupForm />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/users/:username" element={<UserProfile />}></Route>/
            <Route path="/products/:product_id" element={<ProductDetail />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
