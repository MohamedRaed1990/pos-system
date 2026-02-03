import { createContext , use, useEffect , useState } from "react";

import API from "../api/axios";

export const AuthContext = createContext();


export const AuthProvider = ({children})=>{
    const [user , setUser] = useState(null);

    const [loading , setLoading] = useState(true);


    // useEffect(() => {
    //     const fetchMe = async () => {
            
    //         try {
    //             const res = await API.get('/auth/me') 
    //             console.log("✅ نجاح جلب البيانات:", res.data); // لنرى البيانات القادمة
    //             setUser(res.data)
    //         } catch (err) {
    //             console.error("❌ فشل جلب البيانات:", err); // لنعرف سبب الفشل
    //             if (err.response) {
    //                 console.log("Status Code:", err.response.status);
    //                 console.log("Server Message:", err.response.data);
    //             }
    //             setUser(null)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     fetchMe()
    // }, [])
    useEffect(() => {

        const fetchMe = async () => {
            try {
                // 1. جرب أولاً كأدمن
                const adminRes = await API.get('/admin/auth/me');
                console.log("Data from Server:", adminRes.data); // تفقد هذا في متصفحك (F12)
                setUser(adminRes.data.user || adminRes.data);
            } catch (err) {
                try {
                    // 2. إذا فشل الأدمن، جرب كمسخدم عادي
                    const userRes = await API.get('/auth/me');
                    console.log("Data from Server:", userRes.data);
                    setUser(userRes.data.user || userRes.data);
                } catch (userErr) {
                    // 3. إذا فشل الاثنين، إذن الشخص غير مسجل دخول
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchMe()
    }, [])

    // useEffect(() => {
    //     if (!document.cookie.includes('admin_token')) {
    //         setLoading(false)
    //         return
    //     }

    //     API.get('/admin/auth/me')
    //     .then(res => setUser(res.data))
    //     .catch(() => setUser(null))
    //     .finally(() => setLoading(false))
    // }, [])

    // useEffect(()=>{
    //     API.get('/admin/auth/me')
    //     .then(res => setUser(res.data))
    //     .catch(() => setUser(null))
    //     .finally(()=>setLoading(false))
    // },[]);



    // useEffect(() => {
    //     const fetchMe = async () => {
    //         try {
    //             const adminRes = await API.get('/admin/auth/me');
    //             setUser({ ...adminRes.data, role: 'admin' });
    //         } catch (adminErr) {
    //             if (adminErr.response?.status !== 401) {
    //                 console.error(adminErr);
    //             }

    //             try {
    //                 const userRes = await API.get('/auth/me');
    //                 setUser({ ...userRes.data, role: 'user' });
    //             } catch (userErr) {
    //                 if (userErr.response?.status !== 401) {
    //                     console.error(userErr);
    //                 }
    //                 setUser(null);
    //             }
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchMe();
    // }, []);


    const register = async (name , email , password) => {
        const res = await API.post('/auth/register', {name,email,password})

        setUser(res.data.user)
        
    }

    const login = async (email , password) => {
        const res = await API.post('/auth/login', {email,password})

        setUser(res.data.user)
    }

    const logout = async () => {
        await API.post('/auth/logout')

        setUser(null)
        window.location.replace('/login');
    }

    return (
        <AuthContext.Provider value={{user , login , logout , register , loading}}>
            {!loading && children}
        </AuthContext.Provider>
    );



}