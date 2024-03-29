/* eslint-disable react/prop-types */
import { useEffect } from "react";
import soundFilePath from "./mixkit-cool-interface-click-tone-2568.wav"; // Update this with the correct path to your sound file
import "./Health.css";

const Question = ({ question, onAnswerClick = () => {} }) => {
    // Function to play the sound
    const playSound = () => {
        const audio = new Audio(soundFilePath);
        audio.play();
    };
  
    // Add an effect to play sound whenever an option is clicked
    useEffect(() => {
        // Clean up any previous audio instances
        return () => {
            const audio = new Audio(soundFilePath);
            audio.pause();
            audio.currentTime = 0;
        };
    }, [soundFilePath]); // Include soundFilePath in the dependency array
  
    return (
        <div className="question h-[300px]">
            <h2 className="text-3xl font-bold">{question.question}</h2>
            <ul className="options mt-14">
                {question.answerOptions.map((option, index) => {
                    return (
                        <li className="text-2xl font-semibold" key={index}>
                            <button onClick={() => {
                                playSound();
                                onAnswerClick(index);
                            }}>
                                {option.text}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Question;
