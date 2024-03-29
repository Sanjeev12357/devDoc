import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Score.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';
import { decreaseScore, increaseScore } from '../../utils/scoreSlice';
import Navbar from '../Navbar/Navbar';

const Score = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const score=useSelector(state=>state.score);
  const report =useSelector(state=>state.report);
  console.log(report);


  const getHealth = async () => {

    const health = await axios.get("http://localhost:3000/api/v1/health");
    const healthData = health.data.health;

    const latestData = healthData[healthData.length - 1];
    console.log(latestData);
    setData(latestData);
    showToastWarnings(latestData);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getHealth();
  }, []);

  const showToastWarnings = (healthData) => {
    const { heartrate, stepcount, spO2, BP, sleep } = healthData;

    // Desired ranges for health properties
    const desiredRanges = {
      heartrate: { min: 60, max: 100 },
      stepcount: { min: 5000, max: 10000 },
      spO2: { min: 95, max: 100 },
      BP: { min: 120, max: 140 },
      sleep: { min: 7, max: 9 },
    };

  };

  return (
    <>
    <Navbar/>
    
    <div className='flex flex-col items-center mt-16 justify-center'>

    <div className='font-bold mt-16 flex items-center text-3xl '>Total Score:{score.scores}
    
    {score.scores >= 15 ? <div className='pl-2 '> 🫡👍</div> : <div className='pl-2  '>😰🤧</div>}
    </div>
      <table className='text-3xl table'>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Doc Suggestion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Heart Rate</td>
            <td>{data.heartrate}</td>
            <td>{data.heartrate > 60 && data.heartrate < 100 ? "Good to go , just eat healthy" : 
              <ul>
                <li>Medical Evaluation: Undergo a thorough medical evaluation, including a physical examination and diagnostic tests such as an electrocardiogram (ECG/EKG), Holter monitor, echocardiogram, or stress test. These tests will help determine the underlying cause and severity of the arrhythmia.</li>
                <li>Medication: Depending on the type of arrhythmia diagnosed, medications may be prescribed to help regulate the heartbeat. This may include beta-blockers, calcium channel blockers, antiarrhythmic drugs, or blood thinners (anticoagulants) if there is a risk of blood clots.</li>
                <li>Lifestyle Modifications: Adopt heart-healthy lifestyle changes, such as maintaining a balanced diet low in sodium and saturated fats, engaging in regular physical activity, quitting smoking, limiting alcohol and caffeine intake, and managing stress.</li>
              </ul>
            }</td>
          </tr>
          <tr>
            <td>Step Count</td>
            <td>{data.stepcount}</td>
            <td>{data.stepcount > 5000 && data.stepcount < 10000 ? "You're doing great! Keep moving!" : "Try to increase your daily step count for better health."}</td>
          </tr>
          <tr>
            <td>SpO2</td>
            <td>{data.spO2}</td>
            <td>{data.spO2 >= 95 && data.spO2 <= 100 ? "Your SpO2 levels are normal." : "Consult a healthcare professional for SpO2 levels below normal."}</td>
          </tr>
          <tr>
            <td>Blood Pressure (BP)</td>
            <td>{data.BP}</td>
            <td>{data.BP >= 120 && data.BP <= 140 ? "Your blood pressure is within the normal range." : "Monitor your blood pressure closely and consult a doctor if it consistently falls outside the normal range."}</td>
          </tr>
          <tr>
            <td>Sleep (Hours)</td>
            <td>{data.sleep}</td>
            <td>{data.sleep >= 7 && data.sleep <= 9 ? "You're getting adequate sleep." : "Aim for 7-9 hours of sleep per night for optimal health."}</td>
          </tr>
        </tbody>
      </table>
      <ToastContainer />
    </div>
    </>
  );
};

export default Score;
