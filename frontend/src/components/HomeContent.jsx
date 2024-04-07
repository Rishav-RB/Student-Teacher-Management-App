import React, { useState } from 'react'
import useLogin from '../hooks/useLogin'
import MovingSVG from '../pages/Bubbles'
import {useNavigate} from 'react-router-dom'

const HomeContent = () => {
    const [inputs,setInputs]=useState({
        userType:'',
        email:'',
        password:'',
      })
    const {loading,login}=useLogin()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await login(inputs)
        setInputs({
            userType:'',
            email:'',
            password:'',
        })
    }
  return (
    <div className="hero min-h-screen bg-base-200 relative">
        <MovingSVG/>
        <div className="hero-content flex-col lg:flex-row-reverse z-10">
            <div className="text-center lg:text-left ml-3">
            <h1 className="text-5xl font-bold font-sans text-blue-800">Welcome Aboard to :</h1>
            <p className="py-6 italic ">Welcome to ScholarSpace – a cutting-edge platform empowering educators and students to seamlessly exchange academic insights and resources. Join our vibrant community today and embark on a journey of collaborative learning and knowledge sharing!</p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">User Type</span>
                    </label>
                    <select className="select select-bordered w-full max-w-xs " required defaultValue="Choose"
                    onChange={(e)=>setInputs({...inputs,userType:e.target.value})}>
                        <option disabled>Choose</option>
                        <option value='student'>Student</option>
                        <option value='teacher'>Teacher</option>
                    </select>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" required
                value={inputs.email}
                onChange={(e)=>setInputs({...inputs,email:e.target.value})}
                />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" required
                value={inputs.password}
                onChange={(e)=>setInputs({...inputs,password:e.target.value})} 
                />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                </div>
                <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
                </div>
            </form>
            </div>
        </div>
    </div>
  )
}

export default HomeContent