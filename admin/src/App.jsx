import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';

import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminAuthContext from './context/AdminAuthContext';

import AdminLogin from './pages/AdminLogin'
import AdminRegister from './pages/AdminRegister'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Products from './pages/Products'
import Transactions from './pages/Transactions'
import CreateProduct from './pages/CreateProduct'
import Sales from './pages/Sales'
import Customers from './pages/Customers'
import Invoices from './pages/Invoices'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'

const ProtectedRoute = ({ children }) => {
  const { admin, loading, error } = useContext(AdminAuthContext);
  if (loading) return <p>Loading...</p>;
  if (error) return <div>Error: {error} </div>;
  if (!admin) return <AdminLogin />;
  return children;
}

function App() {


  return (
    <AdminAuthProvider>
      <Router>


        <Header />
        <Routes>
          <Route path='/login' element={<AdminLogin />} />
          <Route path='/register' element={<AdminRegister />} />

          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path='/users' element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          } />

          <Route path='/products' element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } />

          <Route path='/transactions' element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          } />

          <Route path='/products/create' element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          } />

          <Route path='/sales' element={
            <ProtectedRoute>
              <Sales />
            </ProtectedRoute>
          } />

          <Route path='/customers' element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          } />

          <Route path='/invoices' element={
            <ProtectedRoute>
              <Invoices />
            </ProtectedRoute>
          } />


          <Route path='/reports' element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } />

          <Route path='/settings' element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />

          <Route path='/notifications' element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />







        </Routes>

      </Router>
    </AdminAuthProvider>

  )
}

export default App
