import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { sampleHeartbeatData } from '../components/Graph/data'
import HeartbeatGraph from '../components/Graph/Graph'
import HeartbeatPieChart from '../components/Graph/Pie'

const Dashboard = () => {
 
  return (
    <>
    <Navbar/>
    <div className='flex bg-gray-300 flex-wrap gap-6 pt-8 items-center w-full px-12 justify-center'>
       
        <div className='w-[1000px] text-3xl rounded-xl  shadow-md bg-indigo-200 border-2 h-[700px]'>
        <HeartbeatGraph heartbeatData={sampleHeartbeatData} />

        </div>
        <div className='w-[600px] text-3xl bg-slate-200 shadow-md rounded-xl border-2 h-[700px]'>
        <HeartbeatPieChart heartbeatData={sampleHeartbeatData}/>
        </div>
        <div className='w-[600px]  bg-slate-200 shadow-md rounded-xl  border-2 h-[500px]'>
        
        </div><div className='w-[1000px] bg-indigo-200 shadow-md rounded-xl  border-2 h-[500px]'>
        </div>
       
    </div>
    </>
    
  )
}

export default Dashboard