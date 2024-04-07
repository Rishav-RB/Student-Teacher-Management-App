import React, { useEffect, useState } from 'react'
import Navbar from '../components/NavbarPost'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
const PersonalDetails = () => {
    const [result,setResult]=useState([])
    const user=useSelector(state=>state.user_data)
    const naviagte=useNavigate()
    useEffect(()=>{
        const getResult=async()=>{
            try{
                const res=await fetch(`/student/api/user/detail/${user.email}/`,{
                    method:'GET'
                })
                const data=await res.json()
                console.log(data)
                setResult(data)
                console.log(result)
            }catch(e){
                console.log(e)
            }
        }
        getResult()
    },[])
  return (
    <div data-theme='corporate'>
    <Navbar/>
        <div className='bg-white min-h-screen flex justify-center items-center'>
            <div className="card w-[700px] text-neutral-content">
                <div className="card-body items-center text-center bg-slate-300">
                    <h1 className="card-title text-black italic text-3xl fotn-bold ">Personal Details</h1>
                    <div className="divider bg-blue-900 h-[2px]"></div>
                    <div className='flex-row justify-center items-center'>
                        <p className="text-blue-800 text-xl font-semibold">Name:</p>
                        <p className='italic text-green-600 text-xl'>{result.name}</p>
                    </div>
                    <div className="divider bg-blue-900 h-[2px]"></div>
                    <div className='flex-row justify-center items-center'>
                        <h2 className="text-blue-800 text-xl font-semibold">Registration Number:</h2>
                        <h2 className='text-green-600 text-xl italic'>{result.registration_number}</h2>
                    </div>
                    <div className="divider bg-blue-900 h-[2px]"></div>
                    <div className='flex-row justify-center items-center'>
                        <h2 className="text-blue-800 text-xl font-semibold">Email:</h2>
                        <h2 className='text-green-600 text-xl italic'>{result.email}</h2>
                    </div>
                    <div className="divider bg-blue-900 h-[2px]"></div> 
                    <div className="card-actions justify-end mt-3">
                        <button className="btn rounded-md bg-blue-600 text-slate-200 hover:bg-blue-300 hover:text-black" onClick={()=>naviagte('/student/home')}>Go back</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PersonalDetails