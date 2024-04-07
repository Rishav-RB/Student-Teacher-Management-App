import React, { useState } from 'react'
import toast from 'react-hot-toast'
//import { useAuthContext } from '../context/authContext'

const useSignup = () => {
  const [loading,setLoading]=useState(false)
  //const {authUser,setAuthUser}=   useAuthContext()
  const signup=async({userType,name,email,password})=>{
    const success=handleInputErrors({userType,name,email,password})
    if(!success){
        return
    }
    setLoading(true)
    try {
        console.log(userType)
            console.log("fetching..")
            const res=await fetch('/api/user/register/',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({name,email,password})
            })
            const data=await res.json()
            if(data.error){
                throw new Error(data.error)
            }
            //local storage
            //localStorage.setItem('chat-user',JSON.stringify(data))
            //context
            //setAuthUser(data)
            console.log(data)
    } catch (error) {
        toast.error(error.message)
    }finally{
        setLoading(false)
    }
    }
    const studentsignup=async({userType,name,registration_number,email,password})=>{
        const success=handleInputErrors({userType,name,registration_number,email,password})
        if(!success){
            return
        }
        setLoading(true)
        try {
            console.log(userType)
                console.log("fetching..")
                const res=await fetch('/student/api/user/register/',{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({name,registration_number,email,password})
                })
                const data=await res.json()
                if(data.error){
                    throw new Error(data.error)
                }
                //local storage
                //localStorage.setItem('chat-user',JSON.stringify(data))
                //context
                //setAuthUser(data)
                console.log(data)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
  }
  return {loading,signup,studentsignup}
}

export default useSignup

function handleInputErrors({userType,name,email,password}){
    if(!userType || !email || !password || !name){
        toast.error('Please fill all the fields!')
        return false
    }
    return true
}