import React from 'react'
import study from '../assets/study.jpg'

const InfoCard = ({func,title,desctiprion}) => {
  return (
    <div className='mt-4 flex items-center justify-center'>
        <div className="card w-[480px] bg-base-100 shadow-xl h-[420px]">
            <figure><img src={study} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{desctiprion}</p>
                <div className="card-actions justify-end mt-2">
                <button className="btn btn-primary bg-blue-500" onClick={()=>func()}>Take Me There</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InfoCard