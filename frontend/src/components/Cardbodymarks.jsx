import React from 'react'

const Cardbodymarks = ({subject,marks}) => {
  return (
    <div>
        <div className="card-body flex-row bg-slate-300 items-center justify-center h-[10px]">
            <h2 className="text-blue-800 text-xl font-semibold">{subject}:</h2>
            <h2 className='text-amber-500 text-xl'>{marks}</h2>
        </div>
        <div className="divider bg-blue-900 h-[2px]"></div>
    </div>
  )
}

export default Cardbodymarks