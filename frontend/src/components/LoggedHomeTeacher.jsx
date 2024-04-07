import React from 'react'
import InfoCard from './InfoCard'
import {useNavigate} from 'react-router-dom'
const LoggedHomeStudent = () => {
  const navigate=useNavigate()
  const handle1=()=>{
    console.log("Run")
    navigate('/teacher/add-subject')
  }
  return (
    <div className='min-h-screen grid grid-cols-3 gap-3 mt-4'>
      <InfoCard func={handle1} title='Add Subject' desctiprion='Add subject and the Students that take that subject under you.'/>
      <InfoCard func={()=>navigate('/teacher/add-marks')} title='Add Marks' desctiprion='Add Marks of the subjects that you take.'/>
      <InfoCard func={()=>navigate('/teacher/create-result')} title='Generate Result' desctiprion='Generate Result for the students (Only to be done after all marks are uoloaded!)'/>
      <InfoCard func={()=>navigate('/teacher/view-students')} title='View student details' desctiprion='View all students or the students that are Fast/Slow/Average Leaners'/>
      <InfoCard func={()=>navigate('/teacher/view-students')} title='View Marks' desctiprion='Check Marks of all Students'/>
      <InfoCard func={()=>navigate('/teacher/view-results')} title='View result' desctiprion='Check Result of all Students'/>
    </div>
  )
}

export default LoggedHomeStudent