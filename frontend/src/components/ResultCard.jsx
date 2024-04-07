import React from 'react'

const ResultCard = ({num,id,grade,type,percentage,name}) => {
  return (
    <tr className='bg-slate-200 font-semibold text-xl'>
        <th></th>
        <td className='text-blue-600'>{id}</td>
        <td className='text-blue-600'>{name}</td>
        <td className='text-green-600'>{grade}</td>
        <td className='text-blue-600'>{type}</td>
        <td className='text-amber-500'>{percentage}</td>
    </tr>
    
  )
}

export default ResultCard