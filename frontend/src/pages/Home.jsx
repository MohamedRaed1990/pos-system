import { color, motion } from 'framer-motion'



const Home = () => {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className='px-30 py-30 text-4xl text-neutral-600'>
      Hello Mohamed Raed
    </motion.div>
  )
}

export default Home
