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
import ReviewsForm from './components/form/reviewsForm';
import Reviews from './components/Reviews';
import NewProduct from './components/form/createProductForm';
import Checkout from './components/form/checkoutForm';
import ThankYouPage from './components/checkoutComplete';

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <div>
      <BrowserRouter basename={basename}>
        <Nav />
        <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
          <Routes>
            <Route path="" element={<Products />}></Route>
            <Route path="/categories" element={<Categories />}></Route>
            <Route path="/categories/new" element={<CategoryForm />}></Route>
            <Route path="/signup" element={<SignupForm />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/users/:username" element={<UserProfile />}></Route>
            <Route path="/products/:product_id" element={<ProductDetail />}></Route>
            <Route path="/products/new" element={<NewProduct />}></Route>
            <Route path="/users/:username/reviews/new" element={<ReviewsForm />}></Route>
            <Route path="/users/:username/reviews" element={<Reviews />}></Route>
            <Route path="/checkout/:product_id" element={<Checkout />} ></Route>
            <Route path="/complete" element={<ThankYouPage />} ></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
