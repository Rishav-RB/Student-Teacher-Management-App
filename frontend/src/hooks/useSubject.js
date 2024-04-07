import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {useDispatch} from 'react-redux'
import { addUserData } from '../features/todo/userSilce'
//import { useAuthContext } from '../context/authContext'

const useSubject= () => {
  const [loading,setLoading]=useState(false)
  //const {authUser,setAuthUser}=   useAuthContext()
  const upload=async({name,teacher,student})=>{
    console.log(name,teacher,student)
    const success=handleInputErrors({teacher,student,name})
    if(!success){
        return
    }
    setLoading(true)
    try {
            const res=await fetch('/student/api/subjects/add/',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({name,student,teacher})
            })
            const data=await res.json()
            //local storage
            //localStorage.setItem('chat-user',JSON.stringify(data))
            //context
            //setAuthUser(data)
            console.log(data)
            toast.success('Subject Added Succesfully!')
    } catch (error) {
        toast.error(" Failed")
    }finally{
        setLoading(false)
    }
  }
  return {loading,upload}
}

export default useSubject

function handleInputErrors({teacher,name,student}){
    if(!student || !teacher || !name){
        toast.error('Please fill all the fields!')
        return false
    }
    return true
}