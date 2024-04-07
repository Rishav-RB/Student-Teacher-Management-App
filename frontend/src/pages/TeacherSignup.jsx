import React, { useState } from 'react'
import useSignup from '../hooks/useSignup'
import {useDispatch} from 'react-redux'
import { addUserData } from '../features/todo/userSilce'
import {useNavigate} from 'react-router-dom'

const TeacherSignup = () => {
    const navigate=useNavigate()
    const [inputs,setInputs]=useState({
        userType:'teacher',
        name:'',
        email:'',
        password:'',
      })
    const {loading,signup}=useSignup()
    let should_navigate=false
    const dispatch=useDispatch()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await signup(inputs)
        const store_data={
            "name":inputs.name,
            "userType":inputs.userType,
            "email":inputs.email
        }
        dispatch(addUserData(store_data))
        setInputs({
            userType:'teacher',
            name:'',
            email:'',
            password:'',
        })
        //should_navigate=true
        //return <Navigate to='/'/>
    }
  return(
    <div className='bg-white min-h-screen flex justify-center items-center'>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-black">Name</span>
                    </label>
                    <input type="text" placeholder="Name" className="input input-bordered bg-white" required 
                    value={inputs.name}
                    onChange={(e)=>setInputs({...inputs,name:e.target.value})}/>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold text-black">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered bg-white" required
                value={inputs.email}
                onChange={(e)=>setInputs({...inputs,email:e.target.value})} />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold text-black">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered bg-white" required 
                value={inputs.password}
                onChange={(e)=>setInputs({...inputs,password:e.target.value})}/>
                </div>
                <div className="form-control mt-6">
                <button className="btn bg-blue-700 text-black hover:text-white hover:bg-blue-800" type='submit'>Sign Up</button>
                </div>
            </form>
            <div className="form-control justify-center items-center pb-5 pt-0 mt-0">
              <button className="btn w-[100px] bg-blue-500 text-black hover:text-white hover:bg-blue-800" onClick={()=>navigate('/')}>Back</button>
            </div>
        </div>
    </div>
  )
}

export default TeacherSignup