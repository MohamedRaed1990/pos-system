import { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import {motion} from 'framer-motion';
import {Package , AlertCircle , Plus} from 'lucide-react';


const Products = () => {
    const [products , setProducts] = useState([]);
    const [ error , setError ] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        API.get('/products')
        .then((res) => setProducts(res.data))
        .catch((err) => {
            console.error(err)
            setError('Failed to fetch products')
        })
    })
  return (
    <div className="pt-32 min-h-screen p-10 bg-linear-to-b from-[#faf6ef] to-[#f0e5d2]">
    <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
      className='flex items-center justify-between mb-10'>
         <div className='flex items-center gap-3'>
          <div className='p-3 bg-[#C9A86A]/20 border border-[#C9A86A]/40 rounded-xl'>
          <Package size={36} className="text-[#C9A86A]"/>
          </div>
          <h1 className='text-4xl font-bold text-neutral-900 tracking-wide'>
            Products
          </h1>
        </div>
        <motion.button whileHover={{scale:1.05}} whileTap={{scale:0}}
        onClick={()=> navigate('/products/create')} className='px-5 py-3 flex items-center gap-2
        bg-[#C9A86A] text-white rounded-xl shadow-md hover:bg-[#b8965f] transition'>
          <Plus size={20} /> Add Product

        </motion.button>
        </motion.div>
        {error && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}}
            className="flex items-center gap-2 p-3 bg-red-100 border
            border-red-300 text-red-700 rounded-md mb-6">
                <AlertCircle size={20}/>
                {error}

            </motion.div>
        )}
        {products.length === 0 ? (
            <motion.p initial={{opacity:0}} animate={{opacity:1}}
            className="text-neutral-600 text-lg">
                No Products Found

            </motion.p>
        ):(
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p)=>(
                    <motion.div key={p._id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
                    whileHover={{scale:1.04}}
                    className="p-6 bg-white/90 backdrop-blur-xl border border-[#C9A86A]/25
                    rounded-2xl shadow-md hover:shadow-2xl cursor-pointer transition-all ">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-[#C9A86A]/10 border-[#C9A86A]/30 rounded-xl">
                                <Package size={28} className="text-[#C9A86A]"/>
                            </div>
                            <h2 className="text-xl font-semibold text-neutral-800">
                                {p.name}
                            </h2>
                        </div>
                        <p className="text-neutral-700 font-medium">
                            Purchase Price: {p.purchasePrice}
                        </p>
                        <p className="text-neutral-700 font-medium">
                            Selling Price: {p.sellingPrice}
                        </p>
                        <p className="text-neutral-500 mt-1">
                            Stock: {p.stock}
                        </p>
                        <p className="text-neutral-500 mt-1">
                            Category: {p.category}
                        </p>

                        {p.stock < p.minStock && (
                            <p className="mt-2 text-sm text-red-600 font-semibold">
                                ⚠️ Low Stock! Min : {p.minStock} 

                            </p>

                        )}


                    </motion.div>
                ))}

            </div>
        )}
      
    </div>
  )
}

export default Products
