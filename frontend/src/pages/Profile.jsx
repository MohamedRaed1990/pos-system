import { useEffect , useState } from 'react';
import { Button , Box , Typography , Avatar , Paper , Divider } from '@mui/material';
import API from '../api/axios';
import { motion } from 'framer-motion';
import { User , Mail , ShieldCheck , Calendar , Key } from 'lucide-react';

import { useContext } from 'react'; 
import { AuthContext } from '../context/AuthContext';
const Profile = () => {
    const { user, loading } = useContext(AuthContext);
    // const [user , setUser] = useState(null)


// useEffect(() => {
//     const fetchUser = async () => {
//         try {
//             const res = await API.get('/admin/auth/me'); // أدمن
//             console.log(res)
//             setUser({ ...res.data, role: 'admin' });
//         } catch (err) {
//             if (err.response?.status === 401) {
//                 // حاول الـ user العادي
//                 try {
//                     const res2 = await API.get('/auth/me'); // user
//                     setUser({ ...res2.data, role: 'user' });
//                 } catch (err2) {
//                     setUser(null);
//                 }
//             } else {
//                 console.error(err);
//             }
//         }
//     };

//     fetchUser();
// }, []);
    
if (loading) {
        return (
            <Box className='flex justify-center items-center h-screen bg-[#f8f6f1]'>
                <Typography variant='h6' className='text-neutral-700'>
                    Loading user data...
                </Typography>
            </Box>
        );
    }

    // 2. إذا لم يجد مستخدم (بعد انتهاء التحميل)
    if (!user) {
        return (
            <Box className='flex justify-center items-center h-screen bg-[#f8f6f1]'>
                <Typography variant='h6' className='text-red-500'>
                    You are not authorized. Please login.
                </Typography>
            </Box>
        );
    }
    
    const roleColors = {
        admin:'bg-red-500 text-white',
        manager:'bg-blue-500 text-white',
        cashier:'bg-green-500 text-white',
    }
    const userRole = user.role || "N/A";
  return (
    <Box className='min-h-screen bg-[#f8f8f1] flex justify-center items-start pt-24 px-4'>
        <motion.div initial={{opacity:0,y:-50}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
        className='max-w-3xl w-full flex flex-col gap-6'>
            <Paper className='p-6 rounded-2xl shadow-xl border border-neutral-300 bg-white'>
                <Box className='flex flex-col md:flex-row items-center gap-6'>
                    <Avatar sx={{width:120,height:120,bgcolor:'goldenrod',fontSize:50,border:'4px solid #FFD700'}}>
                        <User size={50}/>
                    </Avatar>
                    <Box className='flex flex-col gap-3 text-center md:text-left'>
                        <Typography variant='h4' className='font-bold text-yellow-600'>
                            {user.name || "No Name"}

                        </Typography>
                        <Box className={`inline-block px-3 py-1 rounded-full font-medium text-sm
                            ${roleColors[userRole] || "bg-gray-500 text-white"}`}>
                            {userRole.toUpperCase()}

                        </Box>
                        <Typography className='text-neutral-700 '>
                            <Mail size={18} className='inline mr-1 text-yellow-500'/>{" "}
                            {user.email || "No Email"}
                        </Typography>
                        <Typography className='text-neutral-700 '>
                            <Calendar size={18} className='inline mr-1 text-yellow-500'/>
                            Joined:{user.createdAt ? new Date(user.createdAt).toLocaleDateString():"N/A"}
                        </Typography>

                    </Box>

                </Box>

            </Paper>

            {/* Account Details */}
            <Paper className='p-6 rounded-2xl shadow-xl border border-neutral-300
            bg-white flex flex-col gap-4'>
                <Typography variant='h5' className='font-bold text-yellow-600'>
                    Account Details

                </Typography>
                <Divider/>
                <Box className='flex items-center gap-3'>
                    <Key size={22} className='text-yellow-500'/>
                    <Typography className='text-neutral-700'>
                        Password : ****
                    </Typography>
                    <Button size='small' variant='contained' className='ml-auto bg-linear-to-r
                    from-yellow-400 to-orange-500 hover:shadow-yellow-300/40'>
                        Change Password
                    </Button>

                </Box>
                <Box className='flex items-center gap-3'>
                    <User size={22} className='text-yellow-500'/>
                    <Typography className='text-neutral-700'>
                        Role: {userRole}

                    </Typography>

                </Box>
                <Box className='flex items-center gap-3'>
                    <Calendar size={22} className='text-yellow-500'/>
                    <Typography className='text-neutral-700'>
                        Account Created: {" "} {user.createdAt ? new Date(user.createdAt).toLocaleString():"N/A"}

                    </Typography>

                </Box>

            </Paper>

            <Paper className='p-6 rounded-2xl shadow-xl border border-neutral-300
            flex flex-col gap-4'>
                <Typography variant='h5' className='font-bold text-yellow-600'>
                    Additional Info
                </Typography>
                <Divider/>
                <Typography className='text-neutral-700'>
                    ...

                </Typography>

            </Paper>

        </motion.div>

    </Box>
  )
}

export default Profile
