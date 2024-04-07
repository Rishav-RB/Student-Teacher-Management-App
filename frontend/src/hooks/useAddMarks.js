import React, { useState } from 'react'
import toast from 'react-hot-toast'
//import { useAuthContext } from '../context/authContext'

const useAddMarks= () => {
  const [loading,setLoading]=useState(false)
  //const {authUser,setAuthUser}=   useAuthContext()
  const upload=async({subject,teacher,student,marks})=>{
    console.log(subject,teacher,student,marks)
    const success=handleInputErrors({teacher,student,subject,marks})
    if(!success){
        return
    }
    setLoading(true)
    try {
            const res=await fetch('/student/api/marks/add/',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({marks,subject,student,teacher})
            })
            const data=await res.json()
            //local storage
            //localStorage.setItem('chat-user',JSON.stringify(data))
            //context
            //setAuthUser(data)
            console.log(data)
            toast.success('Marks Added Succesfully!')
    } catch (error) {
        toast.error(" Failed")
    }finally{
        setLoading(false)
    }
  }
  return {loading,upload}
}

export default useAddMarks

function handleInputErrors({teacher,subject,student,marks}){
    if(!student || !teacher || !subject || !marks){
        toast.error('Please fill all the fields!')
        return false
    }
    return true
}