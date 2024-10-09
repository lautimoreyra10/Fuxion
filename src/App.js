import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import AddProductPage from '../src/pages/AddProductPage';
import './styles.css'; // Styles css
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';  // Protect routes


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        {/* Protegemos la ruta /add-product */}
        <Route 
          path="/add-product" 
          element={
            <ProtectedRoute>
              <AddProductPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};


export default App;