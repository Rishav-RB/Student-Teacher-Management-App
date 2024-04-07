import React, { useEffect, useState } from 'react'
import ResultCard from '../components/ResultCard'
import Navbar from '../components/NavbarPost'
import useGetResultsTeach from '../hooks/useGetResultsTeach'

const ViewResults = () => {
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
  return (
    <div data-theme='corporate'>
        <Navbar/>
        <div className="overflow-x-auto min-h-screen flex justify-center bg-slate-200 mt-4 pt-2">
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
                    {result.map((r)=><ResultCard id={r.student} grade={r.grade} percentage={r.percentage} type={r.type} name={r.name}/>)}
                </tbody>
            </table>    
        </div>
    </div>
  )
}

export default ViewResults