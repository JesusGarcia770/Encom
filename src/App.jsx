import { BrowserRouter, Routes, Route } from 'react-router'

// Páginas públicas
import Home from './pages/public/Home'
import AboutUs from './pages/public/AboutUs'
import Contact from './pages/public/Contact'
import Cart from './pages/public/Cart'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import ForgotPassword from './pages/public/ForgotPassword'

// Páginas privadas (admin)
import Setup from './pages/private/Setup'
import LoginAdmin from './pages/private/LoginAdmin'
import Dashboard from './pages/private/Dashboard'
import Products from './pages/private/Products'
import Categories from './pages/private/Categories'
import Orders from './pages/private/Orders'
import Payments from './pages/private/Payments'
import Users from './pages/private/Users'
import Profile from './pages/private/Profile'
import ForgotPasswordAdmin from './pages/private/ForgotPasswordAdmin'

// Layout del admin
import AdminLayout from './Components/private/AdminLayout'

// Nav público
import Nav from './Components/public/Nav'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<><Nav /><Home /></>} />
        <Route path="/about" element={<><Nav /><AboutUs /></>} />
        <Route path="/contact" element={<><Nav /><Contact /></>} />
        <Route path="/cart" element={<><Nav /><Cart /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* RUTAS ADMIN — sin layout */}
        <Route path="/admin/setup" element={<Setup />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/forgot-password" element={<ForgotPasswordAdmin />} />

        {/* RUTAS ADMIN — con layout (sidebar + topbar) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payments" element={<Payments />} />
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}