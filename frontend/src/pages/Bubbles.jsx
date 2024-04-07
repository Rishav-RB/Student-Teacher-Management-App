// MovingSVG.js

import React from 'react';
import rotate from '../assets/compass.png'
import { motion } from 'framer-motion';

const MovingSVG = ({ imageUrl }) => {
  return (
    <>
    <div className="container flex justify-center items-center absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="svg-container"
        initial={{ y: 500, }}
        animate={{ y: 0,x:400 }}
        transition={{ duration: 1.2, ease: "linear" }}
        style={{ transformOrigin: '58% 48%',zIndex:0,opacity:0.2 ,overflow:'hidden'}} // Specify the rotation point
      >
        {<svg
          xmlns="http://www.w3.org/2000/svg"
          width="600"
          height="600"
          viewBox="0 0 100 100"
        >
          <image href={rotate} width="100%" height="100%" />
        </svg>}
      </motion.div>
    </div>
    <div className="container flex justify-center items-center absolute inset-0 z-0 overflow-hidden">
    <motion.div
        className="svg-container"
        initial={{ x: 1000,y:-59 }}
        animate={{ x: 440 ,y:-59}}
        transition={{ duration: 1.2, ease: "linear" }}
        style={{ transformOrigin: '58% 48%',zIndex:0,opacity:1 ,overflow:'hidden'}} // Specify the rotation point
      >
        <h1 className='text-5xl font-bold font-sans text-green-600'>Scholar Space</h1>
      </motion.div>
    </div>
    </>
  );
};

export default MovingSVG;
