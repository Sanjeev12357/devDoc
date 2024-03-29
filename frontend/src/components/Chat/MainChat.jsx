import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import "./main.css"
import { addReducer } from '../../utils/reportSlice';
import { useDispatch } from 'react-redux';
export const ChatComponent = () => {
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([]);
const dispatch=useDispatch();
 

  const genAI = new GoogleGenerativeAI("AIzaSyC6L0mf9MyQ-yk235PO26mC8zqnO5JGj5I");
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-001" });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };


  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
       const prompt = `Act as an expert doctor named Dr. Healthwise, designed to assist users in diagnosing health issues, providing personalized advice, and suggesting home remedies and lifestyle adjustments. Dr. Healthwise is characterized as a caring and empathetic virtual doctor, dedicated to ensuring the well-being of its patients. The chatbot is programmed to ask probing questions, Doctor should always ask one question at a time and when the patient answers then go on to the next question., leaving no stone unturned in gathering relevant information to provide accurate guidance. He always introduces himself first, then asks question always one question at a time and after patient answers the current question then asks next question, gathers sufficient information and then diagnose the patient like a real life doctor. The doctor should not ask too many questions he will ask only sufficient questions to assess the patient condition and he also do not repeat same question twice. If the patient says "Hi" then the doctor should introduce himself and ask the patient about his problems but if the patient is directly telling his or her problem then he should ask him the information needed one at a time and diagnose him.
       At the end of the conversation give the home remedies and change in lifestyle and living methods to the patient. write the messages in formatted form and in bullet points

        Conversation history: ${messages.map(msg => `${msg.type}: ${msg.text}`).join('\n')}
        
        Current message: ${search} `;


      const newMessages = [...messages, { type: 'user', text: search }];
      setMessages(newMessages);
      
      setSearch("");
  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
  
      setMessages([...newMessages, { type: 'ai', text }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Error fetching AI response");
    } finally {
      setLoading(false);
    }
  };


  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };



  return (
    <div className='flex items-center bg-white h-[90vh] w-full gap-4 flex-col p-10'>
      <h1 className='font-serif bg-slate-200 px-4 py-2 rounded-lg text-black text-4xl uppercase '>Chat with Doc🧑‍⚕️</h1>
      <div className='relative w-full   flex flex-col'>
      <div className="chatContainer flex flex-col overflow-x-hidden overflow-y-auto max-h-[800px]">
  <ul className="gap-4 mr-[100px] grid">
    {messages.map((msg, index) => (
        <li
        key={index}
        className={`text-3xl shadow-black font-semibold w-fit px-6 py-2 ${
          msg.type === 'user'
            ? 'user-message justify-self-end'
            : 'ai-message justify-self-start'
        }`}
      >
       {msg.text}
      </li>
    ))}
  </ul>
</div>
      <div
      className='flex w-5/6  fixed h-[70px]  bottom-10  '
      >
      <input
      type="text"
      className='w-1/2 text-3xl px-8 bg-slate-200   py-1 border rounded-l-2xl border-slate-200'
      placeholder="Enter your search query"
      value={search}
      onKeyPress={handleKeyPress}
      onChange={handleInputChange}
    />
    <button className='rounded-r-2xl  w-[100px] bg-indigo-800 text-white font-semibold text-xl' onClick={handleSearch}>Enter</button>
      </div>
    
      </div>
    </div>
  );
};

export default ChatComponent;
