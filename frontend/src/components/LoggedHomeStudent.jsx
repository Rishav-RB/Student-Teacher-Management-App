import React from 'react'
import InfoCard from './InfoCard'
import {useNavigate} from 'react-router-dom'

const LoggedHomeStudent = () => {
  const navigate=useNavigate()
  return (
    <div className='min-h-screen grid grid-cols-3 gap-3'>
      <InfoCard func={()=>navigate('/student/view-info')} title='View Personal Details' desctiprion='View your personal Details like name,email,etc..'/>
      <InfoCard func={()=>navigate('/student/view-marks')} title='Check Marks' desctiprion='Check marks obtained in the subjects'/>
      <InfoCard func={()=>navigate('/student/view-results')} title='Grade Sheet' desctiprion='View your grade sheet to know your percentage marks,Learner Type and Grade'/>
    </div>
  )
}

export default LoggedHomeStudent