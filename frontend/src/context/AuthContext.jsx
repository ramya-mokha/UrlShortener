import { createContext, useContext, useState,useEffect } from "react";

const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const fetchCurrentUser=async()=>{
        try{
            const response=await fetch(`${import.meta.env.VITE_API_URL}/auth/me`,{
                method:'get',
                credentials:"include",
            })
            if(!response.ok){
                setUser(null);
                return;
            }
            const data=await response.json();
            setUser(data.user);
        }catch(error){
            console.error("Failed to fetch user", error)
            setUser(null);

        }
        finally{
            setLoading(false);
        }

    }
    useEffect(()=>{
        fetchCurrentUser();
    },[])
    return (
        <AuthContext.Provider value={{user,setUser,loading,fetchCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>useContext(AuthContext);