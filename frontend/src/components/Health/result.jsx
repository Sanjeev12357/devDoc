import React, { useEffect } from "react";
import ChatComponent from "../Chat/MainChat";
import {useDispatch} from 'react-redux';
import { increaseScore } from "../../utils/scoreSlice";
const Result = ({ userScores, questions, resetQuiz = () => {},setComp }) => {
  const totalScore = userScores.reduce((acc, score) => acc + score, 0);
const dispatch = useDispatch();

useEffect(() => { 

    dispatch(increaseScore(totalScore))
 },[totalScore])


  return (
    <div className="results">
      <h2 className="text-3xl font-bold">Results</h2>
      <p className="text-2xl font-semibold">
        Your total score is: <span>{totalScore}</span>
      </p>
      <ul>
        {questions.map((question, index) => {
          return (
            <li className="text-2xl" key={index}>
              Q{index + 1}. {question.question}
              <b>{userScores[index]} points</b>
            </li>
          );
        })}
      </ul>
      <button onClick={resetQuiz}>Retry</button>

      <div className="flex items-center bg-slate-200 shadow-xl rounded-md justify-center mx-auto px-10 gap-10 flex-col mt-[50px] border-2 w-3/4 ">
      {
        totalScore > 10 ? <h1 className="text-3xl font-bold text-indigo-800"> You are healthy 🫡 Keep it up</h1> : <h1 className="text-3xl font-bold text-indigo-800"> You are not healthy 💀</h1>
      }
      <div className="items-center">
        <p className="text-2xl font-serif">
        Consult our Doc For Assistance 
        </p>
        <div onClick={()=>setComp('chat')} className="cursor-pointer text-indigo-500 font-semibold text-4xl">Doc🧑‍⚕️</div>
      </div>
      </div>
    </div>
  );
};

export default Result;
