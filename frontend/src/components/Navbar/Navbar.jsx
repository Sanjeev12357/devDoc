import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { BasicUsage } from '../Profile/Profile';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import { Link } from 'react-router-dom'; // Import Link from React Router DOM
import { useSelector } from 'react-redux';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const[scores,setScores]=useState(0);
  const [count,setCount]=useState(1);
const score=useSelector(state=>state.score);

console.log(score.scores);
useEffect(()=>{
  if(score.scores < 15){
    const func=async()=>{
     const data= await axios.get("http://localhost:3000/api/v1/score");
     console.log(data.data);
    }
    func();
  }
},[])

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setName(user.username);
  }, []);

  return (
    <motion.nav // Wrap the <nav> element with motion
      className="navbar bg-slate-300 mb-14"
      initial={{ opacity: 0, y: -50 }} // Initial animation properties
      animate={{ opacity: 1, y: 0 }} // Animation properties when component mounts
      exit={{ opacity: 0, y: -50 }} // Animation properties when component unmounts
    >
   
      <div className="navbar-container">
      <div className='flex gap-2 items-center'>
      <h1 className='text-black text-4xl font-bold '>devDoc:{score.scores}
      
      </h1>
      <div>
        {
          score.scores >= 15 ? (<div className='w-8 h-8 rounded-full bg-green-400 '/>):(<div className='w-8 h-8 rounded-full bg-red-400'/>)
        }
      </div>
      </div>
       
        <div className="menu-icon" onClick={toggle}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={isOpen ? 'nav-menu uppercase active' : 'nav-menu text-black text-2xl font-semibold uppercase'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={toggle}> {/* Replace anchor tag with Link */}
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-links" onClick={toggle}> {/* Replace anchor tag with Link */}
              DashBoard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-links" onClick={toggle}> {/* Replace anchor tag with Link */}
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/flow" className="nav-links" onClick={toggle}> {/* Replace anchor tag with Link */}
              Get Your Health Fixed
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/score" className="nav-links" onClick={toggle}> {/* Replace anchor tag with Link */}
              Report
            </Link>
          </li>
        </ul>
        <div>
          <div className='flex items-center justify-center w-6 h-6 rounded-full cursor-pointer'>
            <BasicUsage username={name} />
          </div>
        </div>
      </div>
    </motion.nav> // Close the motion component
  );
};

export default Navbar;
