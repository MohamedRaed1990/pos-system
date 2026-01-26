import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPackage , FiPlusCircle } from 'react-icons/fi'
import { motion } from 'framer-motion'
import API from '../api/axios'

export default function CreateProductPremium() {
  const [name,setName] = useState('')
  const [price,setPrice] = useState('')
  const [qty,setQty] = useState('')

  const navigate = useNavigate()

  const submit = async(e)=>{
    e.preventDefault()
    await API.post('/products', {name , price , qty})
    navigate('/products')
  }
  return (
    <div className='min-h-screen flex items-center justify-center
    bg-linear-to-b from-[#faf6ef] to-[#e8ddc9] p-6'>
      <motion.div initial={{opacity:0,y:-25}} animate={{opacity:1,y:0}} transition={{duration:0.55}}
      className='w-full max-w-lg bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl
      border border-[#C9A86A]/30'>
        <div className='flex justify-center mb-5'>
          <FiPackage size={42} className='text-[#C9A86A]'/>
        </div>
        <h2 className='text-3xl font-bold text-center text-neutral-900 mb-8'>
          إضافة منتج جديد
        </h2>
        <form onSubmit={submit} className='flex flex-col gap-5'>
          <div>
            <label className="text-neutral-700 font-medium">اسم المنتج</label>
            <input placeholder='مثل: Milk 330ml' value={name} onChange={(e)=>setName(e.target.value)} 
            className='w-full p-3 mt-1 rounded-xl border border-[#C9A86A]/25 outline-none
            focus:border-[#C9A86A] focus:ring-[#C9A86A] focus:ring-1 transition-all'/>
          </div>
          <div>
            <label className="text-neutral-700 font-medium">السعر (بالدولار)</label>
            <input  type='number' placeholder='1.50 :مثل' value={price} step='0.01'
            onChange={(e)=>setPrice(e.target.value)} 
            className='w-full p-3 mt-1 rounded-xl border border-[#C9A86A]/25 outline-none
            focus:border-[#C9A86A] focus:ring-[#C9A86A] focus:ring-1 transition-all'/>
          </div>
          <div>
            <label className="text-neutral-700 font-medium">الكمية</label>
            <input  type='number' placeholder='24 :مثل' value={qty} onChange={(e)=>setQty(e.target.value)} 
            className='w-full p-3 mt-1 rounded-xl border border-[#C9A86A]/25 outline-none
            focus:border-[#C9A86A] focus:ring-[#C9A86A] focus:ring-1 transition-all'/>
          </div>
          <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.96}}
          className='bg-[#C9A86A] text-white py-3 rounded-xl flex items-center justify-center
          gap-2 font-semibold shadow-lg hover:shadow-xl transition-all'>
            <FiPlusCircle size={20}/>
            إضافة منتج

          </motion.button>
        </form>
      </motion.div>
      
    </div>
  )
}

