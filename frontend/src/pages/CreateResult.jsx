import React, { useState } from 'react'
import Navbar from '../components/NavbarPost'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const CreateResult = () => {
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
      await upload()
  }
  const [loading,setLoading]=useState(false)
  const upload=async()=>{
    setLoading(true)
    try {
            const res=await fetch('/student/api/result/create/',{
                method:'POST',
            })
            const data=await res.json()
            if(data){
              toast.success('Result Generated Sucessfully!')
            }
            console.log(data)
    } catch (error) {
        toast.error(" Failed")
    }finally{
      setLoading(false)
    }
  }
  return (
    <div data-theme='corporate'>
        <Navbar/>
        <div className='bg-white min-h-screen flex justify-center items-center'>
        {loading?<div className='loading loading-spinner w-24 bg-blue-400'></div>:
        <div className="card w-[700px] text-neutral-content">
            <div className="card-body items-center text-center bg-slate-300">
                <h2 className="card-title text-blue-800">Generate Result!</h2>
                <p className='text-blue-600'>Once clicked it will generate result of all students. Please check if all the marks have been Uploaded properly before moving forward.</p>
                <div className="card-actions justify-end mt-3">
                <button className="btn bg-blue-600 text-slate-200 hover:bg-blue-300 hover:text-black" onClick={()=>handleSubmit()}>Generate</button>
                <button className="btn bg-slate-400" onClick={()=>navigate('/teacher/home')}>Go back</button>
                </div>
            </div>
            </div>
        }
        </div>
    </div>
  )
}

export default CreateResult