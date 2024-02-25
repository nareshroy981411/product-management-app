import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProductList from './components/Product/ProductList';
import ProductDetail from './components/Product/ProductDetail';
import HomePage from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          {/* <Route path="/products/:id" element={<ProductDetail/>} /> */}
          <Route path="/ProductDetail/:productId" element={<ProductDetail />} />
          <Route path="/" element={<HomePage/>} />
          <Route path="/productList" element={<ProductList/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
