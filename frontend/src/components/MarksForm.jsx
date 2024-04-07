import React, { useState } from 'react'
import useAddMarks from '../hooks/useAddMarks'

const MarksForm = ({subject,teacher,student,std_id}) => {
    const [inputs,setInputs]=useState({
        subject:subject,
        student:std_id,
        teacher:teacher,
        marks:'',
      })
    const {loading,upload}=useAddMarks()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await upload(inputs)
        setInputs({
            subject:subject,
            student:std_id,
            teacher:teacher,
            marks:'',
        })
        //should_navigate=true
        //return <Navigate to='/'/>
    }
  return (
    <div className='mt-4'>
        <form className="flex flex-row justify-center gap-10" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-black">Subject Name</span>
                    </label>
                    <input type="text" value={subject} placeholder="Subject" className="input input-bordered bg-slate-200" required readOnly/>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold text-black">Teacher ID</span>
                </label>
                    <input type="number" value={teacher} placeholder="Teacher" className="input input-bordered bg-slate-200" required readOnly />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-black">Student ID</span>
                    </label>
                        <input type="text" value={student} placeholder="Student" className="input input-bordered bg-slate-200" required readOnly/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-black">Marks</span>
                    </label>
                        <input type="number" placeholder="Marks" className="input input-bordered bg-slate-200" required
                        value={inputs.marksr}
                        onChange={(e)=>setInputs({...inputs,marks:e.target.value})}  />
                </div>
                <div className="form-control mt-9">
                    <button className="btn h-[20px] bg-blue-500 text-black hover:text-white hover:bg-blue-800 rounded-md">Add</button>
                </div>
        </form>
        <div className="divider bg-gray-300 h-[2px]"></div>
    </div>
  )
}

export default MarksForm