import {createContext , useState , useEffect} from 'react'
import axios from '../api/axios'

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({children}) => {
    const [admin,setAdmin] = useState(null)
    const [error,setError] = useState(null)

    useEffect(()=>{
        const fetchAdminData = async() => {
            try{
                const res = await axios.get('/admin/auth/me',{withCredentials:true})
                setAdmin(res.data)
            }catch(err){
                console.log(err);
            }
        }
        fetchAdminData()
    },[])

    const login = async(email,password)=>{
        try{
            const res = await axios.post('/admin/auth/login',{email,password},{withCredentials:true})
            setAdmin(res.data)
            setError(null)
        }catch(err){
            console.log(err)
        }
    } 

    const logout = async()=>{
        try{
            await axios.post('/admin/auth/logout',{},{withCredentials:true})
            setAdmin(null)
        }catch(err){
            console.log(err)
        }
    }

    const register = async(name,email,password,role)=>{
        try{
            const res = await axios.post('/admin/auth/register',{name,email,password,role},{withCredentials:true})
            setAdmin(res.data.admin)
            setError(null)
        }catch(err){
            console.log(err)
        }
    }
    return (
        <AdminAuthContext.Provider value={{admin,setAdmin,login,logout,register,error}}>
            {children}
        </AdminAuthContext.Provider>
    )
}

export default AdminAuthContext