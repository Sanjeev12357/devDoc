import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Health = () => {
  const [health, setHealth] = useState({
    BP: '',
    spO2: '',
    heartrate: '',
    stepcount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHealth((prevState) => ({ ...prevState, [name]: value }));
    console.log(health);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post('http://localhost:3000/api/v1/health', {
        spO2: health.spO2,
        stepcount: health.stepcount,
        BP: health.BP,
        heartrate: health.heartrate,
        sleep:health.sleep
      });

      console.log(data);
      toast.success('Health data submitted successfully!');
      clearInputFields();
    } catch (error) {
      console.error(error);
      toast.error('Error submitting health data');
    }
  };

  const clearInputFields = () => {
    setHealth({
      BP: '',
      spO2: '',
      heartrate: '',
      stepcount: '',
      sleep:''
    });
  };

  return (
    <>
      <Navbar />
      <div
      className='bg-gray-300' 
      style={styles.container}>
        <div style={styles.watchContainer}>
          
          <div style={styles.watchBody}>
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.watchFace}>
                <div style={styles.inputContainer}>
                  <input
                    value={health.heartrate}
                    name="heartrate"
                    onChange={handleChange}
                    type="text"
                    required
                    style={styles.input}
                    placeholder="Heart Rate"
                  />
                </div>
                <div style={styles.inputContainer}>
                  <input
                    value={health.spO2}
                    name="spO2"
                    onChange={handleChange}
                    type="text"
                    required
                    style={styles.input}
                    placeholder="SpO2"
                  />
                </div>
                <div style={styles.inputContainer}>
                  <input
                    value={health.stepcount}
                    name="stepcount"
                    onChange={handleChange}
                    type="text"
                    required
                    style={styles.input}
                    placeholder="Step Count"
                  />
                </div>
                <div style={styles.inputContainer}>
                  <input
                    value={health.BP}
                    name="BP"
                    onChange={handleChange}
                    type="text"
                    required
                    style={styles.input}
                    placeholder="BP"
                  />
                </div>
                <div style={styles.inputContainer}>
                  <input
                    value={health.sleep}
                    name="sleep"
                    onChange={handleChange}
                    type="text"
                    required
                    style={styles.input}
                    placeholder="sleep"
                  />
                </div>
              </div>
              <button type="submit" style={styles.button}>
                Submit
              </button>
            </form>
          </div>
          
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
const styles = {
  container: {
    display: 'flex',
   
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  
  },
  watchContainer: {
    backgroundColor: '#ffcccc', // Change watch container color
    padding: '20px',
    borderRadius: '50%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  watchStrap: {
    height: '100px',
    width: '200px',
    backgroundColor: '#e6cccc', // Change watch strap color
    borderRadius: '5px',
    marginVertical: '10px',
  },
  watchBody: {
    backgroundColor: '#ffe6e6', // Change watch body color
    padding: '20px',
    borderRadius: '50%',
    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  watchFace: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '50%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  inputContainer: {
    marginBottom: '16px',
    padding: '0 30px',
  },
  input: {
    padding: '12px 16px', // Increase input padding
    width: '160px', // Increase input width
    fontSize: '18px', // Increase input font size
    border: '1px solid #ccc',
    borderRadius: '4px',
    textAlign: 'center',
  },
  button: {
    marginTop: '16px',
    padding: '12px 24px', // Increase button padding
    fontSize: '18px', // Increase button font size
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Health;
