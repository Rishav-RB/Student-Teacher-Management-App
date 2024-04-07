import React, { useState } from 'react'
import useSubject from '../hooks/useSubject'
import {useNavigate} from 'react-router-dom'

const AddSubject = () => {
  const navigate=useNavigate()
    const [inputs,setInputs]=useState({
      name:'',
      student:'',
      teacher:'',
    })
  const {loading,upload}=useSubject()
  const handleSubmit=async(e)=>{
      e.preventDefault()
      const numbersArray = inputs.student.split(',').map(num =>num.trim());
      console.log('Input numbers:', numbersArray)
      await upload({'name':inputs.name,"teacher":inputs.teacher,"student":numbersArray})
      setInputs({
          name:'',
          student:'',
          teacher:'',
      })
      //should_navigate=true
      //return <Navigate to='/'/>
  }
  return (
    <div className='bg-white min-h-screen flex justify-center items-center'>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-black">Subject Name</span>
                    </label>
                    <input type="text" placeholder="Subject" className="input input-bordered bg-white" required 
                    value={inputs.name}
                    onChange={(e)=>setInputs({...inputs,name:e.target.value})}/>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold text-black">Teacher ID</span>
                </label>
                <input type="number" placeholder="Teacher" className="input input-bordered bg-white" required
                value={inputs.teacher}
                onChange={(e)=>setInputs({...inputs,teacher:e.target.value})} />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold text-black">Students</span>
                </label>
                <input type="text" placeholder="Student IDs(Separated by a ',')" className="input input-bordered bg-white" required 
                value={inputs.student}
                onChange={(e)=>setInputs({...inputs,student:e.target.value})}/>
                </div>
                <div className="form-control mt-6">
                <button className="btn bg-blue-500 text-black hover:text-white hover:bg-blue-800">Create</button>
                </div>
            </form>
            <div className="form-control mt-0justify-center items-center pb-5 pt-0">
              <button className="btn w-[100px] bg-blue-500 text-black hover:text-white hover:bg-blue-800" onClick={()=>navigate('/teacher/home')}>Back</button>
            </div>
        </div>
    </div>
  )
}

export default AddSubject

/*
Handle array like this
import React, { useState } from 'react';

function NumberInputForm() {
  // State to store the input value
  const [numbersInput, setNumbersInput] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Split the input string into an array of numbers
    const numbersArray = numbersInput.split(',').map(num => parseFloat(num.trim()));
    
    // Do something with the numbersArray
    console.log('Input numbers:', numbersArray);
  };

  // Function to handle input change
  const handleChange = (event) => {
    // Update the input value in state
    setNumbersInput(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="numbers">Enter numbers (comma-separated):</label>
      <input
        type="text"
        id="numbers"
        name="numbers"
        value={numbersInput}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default NumberInputForm;
*/