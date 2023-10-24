import { AuthProvider } from '@galvanize-inc/jwtdown-for-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupForm from './pages/Signup/SignupForm';
import LoginForm from './pages/Login/LoginForm';
import Nav from './components/Navbar';
import ProductDetail from "./components/ProductDetail";
import UserProfile from './components/UserProfile';
import Products from "./components/Products";
import Categories from './components/Categories';
import CategoryForm from './components/form/categoryForm';
import NewProduct from './components/form/createProductForm';

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <div>
      <BrowserRouter basename={basename}>
        <Nav />
        <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
          <Routes>
            <Route path="/" index element={<Products />}></Route>
            <Route path="/categories" element={<Categories />}></Route>
            <Route path="/categories/new" element={<CategoryForm />}></Route>
            <Route path="/signup" element={<SignupForm />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/users/:username" element={<UserProfile />}></Route>/
            <Route path="/products/:product_id" element={<ProductDetail />}></Route>
            <Route path="/products/new" element={<NewProduct />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
