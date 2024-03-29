import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export const Medicine = () => {
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [messages, setMessages] = useState([]);

  const genAI = new GoogleGenerativeAI("AIzaSyC6L0mf9MyQ-yk235PO26mC8zqnO5JGj5I");
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-001" });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const handleInputChange = (event) => {
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

      const prompt = `You are playing the role of an experienced doctor. The user will provide an image of a medicine along with the reason why they are taking it. Your task is to evaluate if taking that particular medicine for the stated reason is appropriate or not. If it is not appropriate, provide a brief explanation of why. Keep your responses concise. Here is your medicine input: ${userInput}`;

      const newMessages = [...messages, { type: 'user', text: `${userInput}`, image: URL.createObjectURL(uploadedFile) }];
      setMessages(newMessages);
      setUserInput("");

      const result = await model.generateContent(prompt, imageData);
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

  return (
    <div className='flex items-center bg-white h-[100vh] w-full gap-4 flex-col p-10'>
      <h1 className='font-serif bg-slate-500 px-4 py-2 rounded-lg text-white text-4xl uppercase '>Medicine Advisor 💊</h1>
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
          <input
            type="text"
            className='w-1/2 text-2xl px-4 bg-slate-200 py-1 border rounded-l-full border-slate-200'
            placeholder="Enter your disease"
            value={userInput}
            onChange={handleInputChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className=" w-[20px] bg-slate-200 px-2  font-semibold text-3xl flex items-center justify-center cursor-pointer"
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
  );
};

export default Medicine;