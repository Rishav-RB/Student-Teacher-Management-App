import React, { useEffect, useState } from 'react'
import MarksForm from '../components/MarksForm'
import Navbar from '../components/NavbarPost'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const AddMarks = () => {
  const navigate=useNavigate()
  const [result,setResult]=useState([])
  //const [students,setStudent]=useState([])
  const user=useSelector(state=>state.user_data)
    useEffect(()=>{
        const getResult=async()=>{
            try{
                const res=await fetch(`/student/api/subjects/view/${user.email}/`,{
                    method:'GET'
                })
                const data=await res.json()
                console.log(data)
                setResult(data.data)
                console.log(result)
            }catch(e){
                console.log(e)
            }
        }
        getResult()
    },[])
    console.log(result)
    //result.map((rst)=>rst.students.map((r)=>console.log(r.id)))
  return (
    <div data-theme='corporate'>
      <Navbar/>
      <div className='bg-white min-h-screen flex justify-center items-center'> 
        <div className=''>
          {result?.map((rst)=>rst.students?.map((r)=><MarksForm teacher={rst.teacher} student={r.registration_number} std_id={r.id} subject={rst.subject}/>))}
          <button className="btn rounded-lg bg-blue-500 text-black hover:text-white hover:bg-blue-800" onClick={()=>navigate('/teacher/home')}>Back</button>
        </div>
      </div>
    </div>
  )
}

export default AddMarks