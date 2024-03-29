import './index.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Singup'
import Dashboard from './pages/Dashboard'

import {SocketProvider} from './context/SocketProvider'
import RoomPage from './screens/Room'
import Health from './pages/Health'
import Flow from './components/timeline/Flow'
import Timeline from './pages/Timeline'
import Score from './components/score/Score'
import Images from './pages/Images'


function App() {
  

  return (
   <main>
   <SocketProvider>
    <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/signin" element={<Signin />} />
      <Route path='/' element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
     
      
      <Route path="/room/:roomId" element={<RoomPage />} />
      <Route path='/services' element={<Health/>}/>
      <Route path='flow' element={<Timeline/>}/>

      <Route path="/score" element={<Score/>}/>
      <Route  path='/image' element={<Images/>}/>
    
      
    </Routes>
    </SocketProvider>
   </main>
  )
}

export default App
