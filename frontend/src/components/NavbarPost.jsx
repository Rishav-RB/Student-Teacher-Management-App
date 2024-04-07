import React from 'react'
import logo2 from '../assets/logo.png'
import {useDispatch} from 'react-redux'
import { removeUserData } from '../features/todo/userSilce'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const logout=()=>{
    dispatch(removeUserData())
    navigate('/')
  }
  return (
    <div className=''>
        <div className="navbar z-50 shadow-xl">
            <div className="flex-none ml-4 mt-2 mr-4">
                <img src={logo2} className='w-[50px] h-[50px]'/>
            </div>
            <div className="flex-1">
                <a className="text-2xl font-bold text-blue-500">Scholar Space</a>
            </div>
            <div className="flex-none mr-5">
                <button className="btn btn-ghost rounded-xl bg-blue-300" onClick={()=>logout()}>
                  Logout
                </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar