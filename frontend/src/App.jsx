
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Notifications from './pages/Notifications';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Invoices from './pages/Invoices';
import Reports from './pages/Reports';
import Customers from './pages/Customers';
import CreateProduct from './pages/CreateProduct';
import Home from './pages/Home';
import EditProduct from './pages/EditProduct';

function App() {


  return (
    <AuthProvider>
      <BrowserRouter>

      <Header/>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />

        <Route path='/' element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
          } />

        <Route path='/products' element={
          <ProtectedRoute>
            <Products/>
          </ProtectedRoute>
          } />

        <Route path='/invoices' element={
          <ProtectedRoute>
            <Invoices/>
          </ProtectedRoute>
          } />

        <Route path='/customers' element={
          <ProtectedRoute>
            <Customers/>
          </ProtectedRoute>
          } />

        <Route path='/reports' element={
          <ProtectedRoute>
            <Reports/>
          </ProtectedRoute>
          } />

        <Route path='/notifications' element={
          <ProtectedRoute>
            <Notifications/>
          </ProtectedRoute>
          } />

        <Route path='/products/create' element={
          <ProtectedRoute>
            <CreateProduct/>
          </ProtectedRoute>
          } />

        <Route path='/products/edit/:id' element={
          <ProtectedRoute>
            <EditProduct/>
          </ProtectedRoute>
          } />   

        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
          } />

        <Route path='*' element={<h1>404 Not Found</h1>}/>   

      </Routes>

      </BrowserRouter>
    </AuthProvider>
     
  )
}

export default App
