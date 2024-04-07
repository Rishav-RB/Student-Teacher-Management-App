import React, { useState } from 'react'
import toast from 'react-hot-toast'

const useGetResultsTeach= () => {
  const [loading,setLoading]=useState(false)
  //const {authUser,setAuthUser}=   useAuthContext()
  const getResults=async()=>{
    setLoading(true)
    try {
            const res=await fetch('/student/api/result/teacher-view/',{
                method:'GET'
            })
            const data=await res.json()
            //local storage
            //localStorage.setItem('chat-user',JSON.stringify(data))
            //context
            //setAuthUser(data)
            console.log(data)
            return data
    } catch (error) {
        toast.error(" Failed")
    }finally{
        setLoading(false)
    }
  }
  return {loading,getResults}
}

export default useGetResultsTeach
