import { useContext, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { FiUser , FiLock , FiShield } from 'react-icons/fi'
import { motion } from 'framer-motion'

import AdminAuthContext from '../context/AdminAuthContext'

const AdminLogin = () => {
  const [email , setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)

  const {login , error} = useContext(AdminAuthContext);

  const navigate = useNavigate()
  const handleLogin = async(e) => {
    e.preventDefault()
    setLoading(true)
    try{
      await login(email,password);
      navigate('/dashboard');
    }catch(err){
      console.error('Login failed',err)
    }
    setLoading(false);
  }
  return (
    <div className='min-h-screen flex items-center justify-center
    bg-linear-to-b from-[#f0e5d2] to-[#e2d1b8] p-6'>
      <motion.div initial={{opacity:0,y:-30}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
      className='w-full max-w-md bg-white/90 backdrop-blur-xl
      rounded-3xl shadow-2xl p-10 border border-[#C9A86A]/30'>
        <div className='text-center mb-6'>
          <motion.div initial={{scale:0.8}} animate={{scale:1}}
          className='flex justify-center mb-3'>
            <FiShield className='text-[#C9A86A] text-5xl'/>
          </motion.div>
          <h1 className='text-2xl font-bold text-gray-800'>
            Admin Login
          </h1>
          <p className='text-gray-500 text-sm mt-1'>
            Sign in to access the dashboard
          </p>
        </div>
        <form onSubmit={handleLogin} className='space-y-4'>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <div className='flex items-center gap-2 p-2 border rounded-lg bg-gray-50'>
              <FiUser className='text-gray-500'/>
              <input type="email" className='w-full outline-none bg-transparent' 
              placeholder='admin@example.com' value={email}
              onChange={(e)=> setEmail(e.target.value)} required/>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div className='flex items-center gap-2 p-2 border rounded-lg bg-gray-50'>
              <FiLock className='text-gray-500'/>
              <input type="password" className='w-full outline-none bg-transparent' 
              placeholder='*******' value={password}
              onChange={(e)=> setPassword(e.target.value)} required/>
            </div>
          </div>
          {error && (
            <p className='text-red-500 text-sm text-center'>{error}</p>
          )}
          <button type='submit'
          disabled={loading}
          className='w-full bg-[#C9A86A] text-white py-2 rounded-lg hover:bg-blue-700 transition'>
            {loading ? 'processing...' : 'Login'}

          </button>
        </form>

      </motion.div>
      
    </div>
  )
}

export default AdminLogin
