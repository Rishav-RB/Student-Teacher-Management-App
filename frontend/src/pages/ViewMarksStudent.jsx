import React, { useEffect, useState } from 'react'
import Navbar from '../components/NavbarPost'
import Cardbodymarks from '../components/Cardbodymarks'
import {useNavigate} from 'react-router-dom'
const ViewMarksStudent = () => {
    const navigate=useNavigate()
    const [result,setResult]=useState([])
    useEffect(()=>{
        const getResult=async()=>{
            try{
                const res=await fetch('/student/api/marks/student-view/',{
                    method:'GET'
                })
                const data=await res.json()
                console.log(data)
                setResult(data.details)
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
            <div className="divider bg-blue-900 h-[2px]"></div>
                {result.map((r,_)=><Cardbodymarks key={_} subject={r.subject} marks={r.marks}/>)}
                <div className="flex justify-items-center items-center mt-3">
                    <button className="btn rounded-md bg-blue-600 text-slate-200 hover:bg-blue-300 hover:text-black" onClick={()=>navigate('/student/home')}>Go back</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewMarksStudent