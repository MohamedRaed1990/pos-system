import {useState , useEffect} from 'react'
import API from '../api/axios'
import {motion , AnimatePresence} from 'framer-motion'
import { FiUser , FiShoppingCart , FiCalendar , FiDollarSign  } from 'react-icons/fi'

const Sales = () => {
  const [ sales , setSales ] = useState([])
  const [ loading , setLoading ] = useState(true)
  const [ error , setError ] = useState(null)

  const fetchSales = async()=>{
    try{
      const res = await API.get('/admin/transactions')
      setSales(res.data)
    }catch(err){
      console.error(err)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchSales()
  },[])
  if(loading) return <div className='p-8 animate-pulse text-lg'>Loading...</div>
  if(error) return <div className='p-8 text-red-500'>{error}</div>
  return (
    <div className='p-6 bg-linear-to-b from-[#faf6ef] to-[#e8ddc9] pt-32 h-screen mx-auto'>
      <h2 className='text-4xl font-bold flex items-center gap-2 mb-6'>
        <FiShoppingCart/> Sales
      </h2>
      <div>
        <AnimatePresence>
          {sales.map((sale,index)=>(
            <motion.div key={sale._id} 
            initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}
            transition={{delay:index * 0.05}}
            className='bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg
            flex flex-col justify-between'>
              <div className='space-y-2'>
                <p className='text-xl font-semibold flex items-center gap-2'>
                  <FiDollarSign/> Amount:
                </p>
                <p className='text-gray-700 flex items-center gap-2'>
                  <FiUser/> User : {sale.userId?.name || ''}
                </p>
                <p className='text-gray-500 flex items-center gap-2'>
                  <FiShoppingCart/> Project : {sale.projectId?.name || ''}
                </p>
                <p className='text-gray-400 flex items-center gap-2'>
                  <FiCalendar/> Status : {sale.status} | Payment:{sale.paymentMethod}
                </p>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Sales
