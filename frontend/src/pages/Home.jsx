import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import Chat from '../components/Chat/Chat';
import QuizComponent from '../components/Health/Health';
import questions from '../constants/questions.json';
import Question from '../components/Health/Health';
import Result from '../components/Health/result';
import LobbyScreen from '../screens/Lobby';
import GetHealth from '../components/getHealth/GetHealth';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import Medicine from '../components/Medicine/Medicine';
import { Link } from 'react-router-dom';

const Home = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userScores, setUserScores] = useState(Array(questions.length).fill(0));
    const [comp, setComp] = useState("chat");

    const handleNextQuestion = (selectedOptionIndex) => {
        const updatedScores = [...userScores];
        updatedScores[currentQuestion] = questions[currentQuestion].answerOptions[selectedOptionIndex].score;
        setUserScores(updatedScores);

        setCurrentQuestion(currentQuestion + 1);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setUserScores(Array(questions.length).fill(0));
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            Navigate("/signup");
        }
    }, []);

    

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 min-h-screen"
        >
            <Navbar />
            <div className="w-full flex mx-auto">
                <div className="w-1/4 rounded-lg mt-16 bg-white text-black px-4 flex gap-4 flex-col py-8  h-[100vh]">
                    <motion.h1
                        onClick={() => setComp('chat')}
                        className="flex bg-slate-200 text-black transition-all duration-200 ease-in font-serif cursor-pointer shadow-md rounded-lg text-3xl items-center justify-center px-4 py-2"
                    >
                        Chat With DOC
                    </motion.h1>
                    <motion.h1
                        onClick={() => setComp('health')}
                        className="flex bg-slate-200 text-black transition-all duration-200 ease-in font-serif cursor-pointer shadow-md rounded-lg text-3xl items-center justify-center px-4 py-2"
                    >
                        Health Check Up
                    </motion.h1>
                   
                    <motion.h1
                    className="flex bg-slate-200 text-black transition-all duration-200 ease-in font-serif cursor-pointer shadow-md rounded-lg text-3xl items-center justify-center px-4 py-2"
                    >
                        <Link to="https://labtestreportanalyser.streamlit.app/">Report Analyser</Link>
                    </motion.h1>
                    <motion.h1
                    className="flex bg-slate-200 text-black transition-all duration-200 ease-in font-serif cursor-pointer shadow-md rounded-lg text-3xl items-center justify-center px-4 py-2"
                    >
                        <Link to="https://nutritionistbydoctor.streamlit.app/">Your Nutrionist</Link>
                    </motion.h1>
                    <motion.div
                        className="flex flex-col items-center py-10 w-full h-full bg-white text-black rounded-md shadow-lg"
                    >
                        <GetHealth />
                      
                    </motion.div>
                </div>
                <div className="w-1/2 h-[100vh] border-4 border-black mt-16 bg-white rounded-lg">
                    {comp === 'chat' ? (
                        <Chat />
                    ) : (
                        comp === 'medicine' ? <Medicine/>:<motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <h1 className="text-5xl font-extrabold text-gray-800 border-b-4 border-indigo-500 py-2 flex items-center justify-center mb-8">
                            Health Check-Up
                        </h1>
                        {currentQuestion < questions.length ? (
                            <Question
                                question={questions[currentQuestion]}
                                onAnswerClick={handleNextQuestion}
                            />
                        ) : (
                            <Result
                                setComp={setComp}
                                userScores={userScores}
                                questions={questions}
                                resetQuiz={resetQuiz}
                            />
                        )}
                    </motion.div>
                    )}
                </div>
                <div className='w-1/4 h-[100vh] mt-16 bg-white rounded-lg'>
                <div className="w-full">
                <LobbyScreen />
            </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Home;
