import React from 'react'
import logo2 from '../assets/logo.png'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  const navigate=useNavigate()
  return (
    <div className=''>
        <div className="navbar fixed shadow-lg z-50">
            <div className="flex-none mr-4 ml-4 mt-2">
                <img src={logo2} className='w-[50px] h-[50px]'/>
            </div>
            <div className="flex-1">
                <a className="text-2xl font-bold text-blue-400">Scholar Space</a>
            </div>
            <div className="flex-none mr-5">
                <button className="btn btn-ghost rounded-xl bg-blue-300" onClick={()=>navigate('student-signup')}>
                  Student Sign Up
                </button>
            </div>
            <div className="flex-none mr-5">
                <button className="btn btn-ghost rounded-xl bg-blue-200" onClick={()=>navigate('/teacher-signup')}>
                  Teacher Sign Up
                </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar