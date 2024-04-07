import React, { useEffect, useState } from 'react'
import Navbar from '../components/NavbarPost'
import ResultCard from '../components/ResultCard'
import {useNavigate} from 'react-router-dom'

const TeacherStudent = () => {
    const navigate=useNavigate()
    const [result,setResult]=useState([])
    useEffect(()=>{
        const getResult=async()=>{
            try{
                const res=await fetch('/student/api/result/teacher-view/',{
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
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top left corner of the page
    }, []);
    const [option,setOption]=useState('all')
    useEffect(()=>{
        console.log(option)
            const getResult=async()=>{
                try{
                    if(option!=='all'){
                        const res=await fetch(`/student/api/user/details/${option}/`,{
                            method:'GET'
                        })
                        const data=await res.json()
                        console.log(data)
                        setResult(data.details)
                        console.log(result)
                    }  
                    else{
                        const res=await fetch(`/student/api/result/teacher-view/`,{
                            method:'GET'
                        })
                        const data=await res.json()
                        console.log(data)
                        setResult(data.result)
                        console.log(result)
                    } 
                }catch(e){
                    console.log(e)
                }
            }
            getResult(option)
    },[option])
  return (
    <div data-theme='corporate'>
        <Navbar/>
        <form className='flex pt-3 pb-3 justify-center items-center bg-slate-200'>
            <select className="select select-bordered w-full max-w-xs mr-3 rounded-lg"onChange={(e)=>setOption(e.target.value)}>
                <option disabled selected>Select Type of Student</option>
                <option value='all'>All</option>
                <option value='fast'>Fast Learners</option>
                <option value='slow'>Slow Learers</option>
                <option value='average'>Average Learners</option>
            </select>
            <button className="btn btn-success rounded-lg" onClick={()=>navigate('/teacher/home')}>Back</button>
        </form>
        <div className=" overflow-x-auto min-h-screen flex justify-center bg-slate-200 pt-2">
            <table className="table">
                {/* head */}
                <thead>
                <tr className='text-xl font-semibold text-black'>
                    <th></th>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Grade</th>
                    <th>Learner Type</th>
                    <th>Percentage</th>
                </tr>
                </thead>
                <tbody>
                    {result?.map((r)=><ResultCard id={r.student} grade={r.grade} percentage={r.percentage} type={r.type} name={r.name}/>)}
                </tbody>
            </table>    
        </div>
    </div>
  )
}

export default TeacherStudent