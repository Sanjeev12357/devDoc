import axios from 'axios';
import React, { useEffect, useState } from 'react';
import footsteps from './footsteps.png';
import spO2 from "./oxygen-saturation.png";
import BP from "./blood-pressure.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sound from './mixkit-cool-interface-click-tone-2568.wav'
import { useDispatch } from 'react-redux';
import { decreaseScore, increaseScore } from '../../utils/scoreSlice';
import sleep from "./sleep.png";


const GetHealth = () => {
  const [data, setData] = useState([]);
  const [count,setCount]=useState(1);

  const getHealth = async () => {
    const health = await axios.get("http://localhost:3000/api/v1/health");
    const data = health.data.health;
    console.log(data[0]);
    const number=data.length;
    console.log(number);
    setData(data[number-1]);
    showToastWarnings(data[number-1]);
  };

  const dispatch=useDispatch();
  useEffect(() => {
    
      getHealth();

      setCount(count + 1);
  
  }, []);



  const showToastWarnings = (healthData) => {
    const { heartrate, stepcount, spO2, BP } = healthData;

    // Desired ranges for health properties
    const desiredRanges = {
      heartrate: { min: 60, max: 100 },
      stepcount: { min: 5000, max: 10000 },
      spO2: { min: 95, max: 100 },
      BP: { min: 120, max: 140 },
    };

    // Check if any property is outside the desired range
    if (heartrate < desiredRanges.heartrate.min || heartrate > desiredRanges.heartrate.max) {
      toast.warn(`Warning: Heart rate (${heartrate}) is not normal.`, { autoClose: 5000,sound: sound});
      if (count == 1)dispatch(decreaseScore(2))
    }else{
      if (count == 1)dispatch(increaseScore(2))
    }

    if (stepcount < desiredRanges.stepcount.min || stepcount > desiredRanges.stepcount.max) {
      toast.warn(`Warning: Step count (${stepcount}) is not normal.`, { autoClose: 5000 });
      if (count == 1) dispatch(decreaseScore(2))
    }else{
      if (count == 1) dispatch(increaseScore(2))
    }

    if (spO2 < desiredRanges.spO2.min || spO2 > desiredRanges.spO2.max) {
      toast.warn(`Warning: spO2 (${spO2}) is not normal.`, { autoClose: 5000 });
      if (count == 1)dispatch(decreaseScore(2))
    }else{
      if (count == 1) dispatch(increaseScore(2))
    }

    if (BP < desiredRanges.BP.min || BP > desiredRanges.BP.max) {
      toast.warn(`Warning: Blood pressure (${BP}) is not normal.`, { autoClose: 5000 });
      if (count == 1) dispatch(decreaseScore(2))
    }else{
      if (count == 1) dispatch(increaseScore(2))
    }
  
}
  

  
  return (
<div className='text-black mt-[400px] flex flex-col items-start justify-start'>
  <div className='flex items-center justify-between w-[500px]'>
    <h1 className='text-3xl tracking-wider font-bold'>Heart Rate</h1>
    <div className='flex items-center gap-10 justify-between'>
      <div><img className='w-10 rounded-full h-10' src='https://media1.giphy.com/media/azi3GTPtxWKCQ/giphy.webp?cid=790b7611npqo698bdnev91wsmsubhbwmfmkboffiap14kx5j&ep=v1_gifs_search&rid=giphy.webp&ct=g' /></div>
      <span className='text-3xl font-semibold ml-2'>{data.heartrate}</span>
    </div>
  </div>

  <div className='flex items-center justify-between w-full'>
    <h1 className='text-3xl tracking-wider font-bold'>Step Count</h1>
    <div className='flex items-center'>
     <div>
     <img className='w-10 rounded-full h-10' src={footsteps} />
     </div>
      <span className='text-3xl font-semibold ml-2'>{data.stepcount}</span>
    </div>
  </div>

  <div className='flex items-center justify-between w-full'>
    <h1 className='text-3xl tracking-wider font-bold'>spO2</h1>
    <div className='flex gap-10 items-center'>
    <div>
    <img className='w-10 rounded-full h-10' src={spO2} />
    </div>
     
      <span className='text-3xl font-semibold ml-2'>{data.spO2}</span>
    </div>
  </div>

  <div className='flex items-center justify-between w-full'>
    <h1 className='text-3xl tracking-wider font-bold'>Blood pressure</h1>
    <div className='flex gap-8 items-center'>
      <div>
      <img className='w-10 rounded-full h-10' src={BP} />
      </div>
      <span className='text-3xl font-semibold ml-2'>{data.BP}</span>
    </div>
  </div>

  <div className='flex items-center justify-between w-full'>
    <h1 className='text-3xl tracking-wider font-bold'>Sleep</h1>
    <div className='flex gap-12 items-center'>
      <div className=''>
      <img className='w-10 rounded-full h-10' src={sleep} />
      </div>
      <span className='text-3xl font-semibold ml-2'>{data.sleep}</span>
    </div>
  </div>

  <ToastContainer />
</div>
  );
};

export default GetHealth;