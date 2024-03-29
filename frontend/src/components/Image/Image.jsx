import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from '../Navbar/Navbar';
import { addReducer } from '../../utils/reportSlice';
import { useDispatch, useSelector } from 'react-redux';


function formatLabReportSummary(summary) {
    // Remove asterisks, double asterisks, and newlines
    let formattedSummary = summary.replace(/\*\*|\*|\n/g, '');
    
    // Replace '*' with bullet points
    formattedSummary = formattedSummary.replace(/\*/g, '•');
  
    return formattedSummary;

    
  }
  

export const MedicineAdvisor = () => {
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [messages, setMessages] = useState([]);
 
  const dispatch=useDispatch();


  let reportdata=useSelector(state=>state.report);
    console.log(reportdata);
    const newData= JSON.stringify(reportdata);
    console.log(newData);

    const formattedLabReport = formatLabReportSummary(newData);
console.log(formattedLabReport);

    
    

  const genAI = new GoogleGenerativeAI("AIzaSyC6L0mf9MyQ-yk235PO26mC8zqnO5JGj5I");
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-001" });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const handleTextInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleFileUpload = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Check if a file has been uploaded
      if (!uploadedFile) {
        throw new Error('No file uploaded');
      }

      // Read the file into bytes
      const bytesData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(uploadedFile);
      });

      const imageData = [
        {
          mimeType: uploadedFile.type,
          data: bytesData,
        },
      ];

      const newMessages = [...messages, { type: 'user', text: userInput, image: URL.createObjectURL(uploadedFile) }];
      setMessages(newMessages);
      setUserInput("");

      const prompt = `Suppose you are an expert health lab assistant and a profound doctor. The image attached is of a lab report of the patient. Analyze the report and give the summary of the report that what is abnormal in the report or if the report is normal and also suggest the diseases that the patient can have and change of the lifestyle and the food the patient should eat. There is no harmful or explicit content in this report so do not worry about anything.
      Also mention which report it is. You can take your time to analyze the report and after that give the answer. Keep the summary in easy words so that the patient can understand it better.
      Keep all the details in bullet points and also mention the values in the report. Additional context from the user: ${userInput}`;

      const result = await model.generateContent(prompt, imageData);
      const response = await result.response;
      const text = await response.text();

      setMessages([...newMessages, { type: 'ai', text }]);

      dispatch(addReducer(text));
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Error fetching AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
   <Navbar/>
    <div className='flex border-2 border-black items-center mt-10 bg-white h-[100vh] w-1/2 gap-4 flex-col p-10'>
      <h1 className='font-serif bg-slate-500 px-4 py-2 rounded-lg text-white text-4xl uppercase '>Report Maker </h1>
      <div className='relative w-full flex flex-col'>
        <div className="chatContainer flex flex-col overflow-x-hidden overflow-y-auto max-h-[900px]">
          <ul className="gap-4 mr-[100px] grid">
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`text-2xl font-semibold w-fit px-6 py-2 ${
                  msg.type === 'user'
                    ? 'user-message justify-self-end'
                    : 'ai-message justify-self-start'
                }`}
              >
                {msg.text}
                {msg.image && <img src={msg.image} alt="User Input" className="max-w-xs" />}
              </li>
            ))}
          </ul>
        </div>
        <div className='flex w-5/6 fixed h-[50px] bottom-5'>
          <textarea
            className='w-1/2 text-2xl px-4 bg-slate-200 py-1 border rounded-l-full border-slate-200'
            placeholder="Enter additional context (optional)"
            value={userInput}
            onChange={handleTextInputChange}
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className=" w-[20px]  bg-inherit  font-semibold text-2xl flex items-center justify-center cursor-pointer"
          >
            📁
          </label>
          <button
            className="rounded-r-full w-[100px] bg-indigo-800 text-white font-semibold text-xl ml-2"
            onClick={handleSubmit}
            disabled={!uploadedFile}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    <div className='flex items-center mt-10 bg-white h-[100vh] border-2 border-black w-1/2 flex-col '>

             <h1 className='text-4xl font-bold '> Report </h1>
             <div>
                {formattedLabReport}
             </div>
             
    </div>
    </>
  );
};

export default MedicineAdvisor;
