import React, { useEffect, useState } from 'react'
import Navbar from '../components/NavbarPost'
import {useNavigate} from 'react-router-dom'
const ViewResultStudent = () => {
    const navigate=useNavigate()
    const [result,setResult]=useState([])
    useEffect(()=>{
        const getResult=async()=>{
            try{
                const res=await fetch('/student/api/result/student-view/',{
                    method:'GET'
                })
                const data=await res.json()
                console.log(data)
                setResult(data.result)
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
                    <h1 className="card-title text-black italic text-3xl font-bold ">Grade Sheet</h1>
                    <div className="divider bg-blue-900 h-[2px]"></div>
                    <div className='flex-row justify-center items-center'>
                        <h2 className="text-blue-800 text-xl font-semibold">Grade:</h2>
                        <h2 className='text-green-600 text-xl italic'>{result.grade}</h2>
                    </div>
                    <div className="divider bg-blue-900 h-[2px]"></div>
                    <div className='flex-row justify-center items-center'>
                        <h2 className="text-blue-800 text-xl font-semibold">Percnetage:</h2>
                        <h2 className='text-green-600 text-xl italic'>{result.percentage}</h2>
                    </div>
                    <div className="divider bg-blue-900 h-[2px]"></div>
                    <div className='flex-row justify-center items-center'>
                        <h2 className="text-blue-800 text-xl font-semibold">Learner Type:</h2>
                        <h2 className='text-green-600 text-xl italic'>{result.type}</h2>
                    </div>
                    <div className="divider bg-blue-900 h-[2px]"></div> 
                    <div className="card-actions justify-end mt-3">
                        <button className="btn rounded-md bg-blue-600 text-slate-200 hover:bg-blue-300 hover:text-black" onClick={()=>navigate('/student/home')}>Go back</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewResultStudent