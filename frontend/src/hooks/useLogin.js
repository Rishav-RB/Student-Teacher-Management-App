import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {useDispatch} from 'react-redux'
import { addUserData } from '../features/todo/userSilce'
//import { useAuthContext } from '../context/authContext'

const useLogin= () => {
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()
  //const {authUser,setAuthUser}=   useAuthContext()
  const login=async({userType,email,password})=>{
    console.log(userType,email,password)
    const success=handleInputErrors({userType,email,password})
    if(!success){
        return
    }
    setLoading(true)
    try {
        if(userType==='teacher'){
            const res=await fetch('/api/user/login/',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email,password})
            })
            const data=await res.json()
            //local storage
            //localStorage.setItem('chat-user',JSON.stringify(data))
            //context
            //setAuthUser(data)
            if(data.jwt){
                const store_data={
                    "userType":userType,
                    "email":email
                }
                dispatch(addUserData(store_data))
            }else{
                throw new Error({message:"Authentication Failed"})
            }
            console.log(data)
        }else if(userType==='student'){
            const res=await fetch('student/api/user/login/',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email,password})
            })
            const data=await res.json()
            if(data.jwt){
                const store_data={
                    "userType":userType,
                    "email":email
                }
                dispatch(addUserData(store_data))
            }
            else{
                throw new Error({message:"Authentication Failed"})
            }
            //local storage
            //localStorage.setItem('chat-user',JSON.stringify(data))
            //context
            //setAuthUser(data)
            console.log(data)
        }
    } catch (error) {
        toast.error("Authentication Failed")
    }finally{
        setLoading(false)
    }
  }
  return {loading,login}
}

export default useLogin

function handleInputErrors({userType,email,password}){
    if(!userType || !email || !password){
        toast.error('Please fill all the fields!')
        return false
    }
    return true
}