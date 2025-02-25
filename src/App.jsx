import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './styles/global.css';
import { store } from './store';
import { theme } from './theme';

// Layout Components
import Layout from './components/Layout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Farmer Pages
import FarmerDashboard from './pages/farmer/Dashboard';
import ProductListing from './pages/farmer/ProductListing';
import OrderManagement from './pages/farmer/OrderManagement';
import InvestorConnect from './pages/farmer/InvestorConnect';

// Buyer Pages
import Marketplace from './pages/buyer/Marketplace';
import Cart from './pages/buyer/Cart';
import OrderTracking from './pages/buyer/OrderTracking';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import SystemAnalytics from './pages/admin/SystemAnalytics';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<Layout />}>
              {/* Farmer Routes */}
              <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
              <Route path="/farmer/products" element={<ProductListing />} />
              <Route path="/farmer/orders" element={<OrderManagement />} />
              <Route path="/farmer/investors" element={<InvestorConnect />} />

              {/* Buyer Routes */}
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders/tracking" element={<OrderTracking />} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/analytics" element={<SystemAnalytics />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;