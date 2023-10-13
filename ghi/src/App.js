import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Navbar';
import ProductDetail from "./pages/ProductDetail";







function App() {
  return (
    <BrowserRouter>
    <Nav />
    <div className="container"></div>
      <Routes>
        <Route path="products/:product_id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
