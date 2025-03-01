import React, { useEffect, useState } from 'react'
import './home.css'
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
const [input,setInput] = useState("");
const [user,setUser] = useState("");
const [status,setStatus] = useState("");
const [statusMessage,setStatusMessage] = useState("");
const [summary,setSummary] = useState("")

useEffect(() => {
  const button = document.getElementById("trynow");
  if (button) {
    button.addEventListener("click", () => {
      document.getElementById("summary").scrollIntoView({ behavior: "smooth" });
    });
  }
}, []);

const handleApi = (e) =>{
  e.preventDefault();
  const api = user.trim();
  if(!api){
      setStatus("Enter a valid API key");
      return;
  }
 localStorage.setItem("user",user);
 alert("API Key saved successfully")
 setUser("");
}

const handlesubmit = (e,key)=>{
  e.preventDefault();
  const text = input.trim();
  if(text){
   const res = getsummary(input,key);
setSummary(res);
    console.log(text);
    setStatusMessage("");
  }
  else{
     setStatusMessage("enter a text first")
  }
}
 

async function getsummary(text,key){
  
  const API = localStorage.getItem("user");
  if (!API) {
    return "Error: API key is missing!";
  }
  const genAI = new GoogleGenerativeAI(API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `Please summarize the following text. 
  - If 'short',minimum give a 1-2 sentence summary.
  - If 'medium',minimum summarize in 3-5 sentences.
  - If 'detailed',minimum provide a 7-10 sentence detailed summary.
  Summary length: ${key} 

  Text:
  ${text}`;
  
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return result.response.text();
}

  return (
    <div>
      <div className="home">
        <h2>Summary </h2>
        <p>Make a brief and long para into small, medium and detailed summary. </p>
        <button id='trynow'>try-now</button>
        <div className="about">
  <div className="short">
    <h3>Short Summary</h3>
    <p>A very brief summary consisting of shorter sentences, capturing the main idea concisely.</p>
  </div>
  <div className="medium">
    <h3>Medium Summary</h3>
    <p>A more detailed summary consisting of medium sentences that provides a bit more context.</p>
  </div>
  <div className="detail">
    <h3>Detailed Summary</h3>
    <p>An in-depth summary consisting of detailed sentences, covering key details and important points.</p>
  </div>
</div>

      </div>

      <div className="api-key">
      <h4>Enter your gemini API key</h4>
      <p>We can make sure to keep it securely.</p>
        <form onSubmit={handleApi}>
          <input type="text" onChange={(e)=> setUser(e.target.value)}  placeholder='API - Key' />
          {status && <p style={{color:"red"}}>{status}</p>}
          <button type='submit'>Save API-key</button>
        </form>
      </div>

      <div className="get">
  <h2>Get your API Key in <a href="https://ai.google.dev/gemini-api/docs/api-key">Gemini</a></h2>
 </div>

      <div className="summary" id='summary'>
        <h3>Enter a text and let a AI to do work.</h3>
        <form >
        <textarea name="text" id="value" onChange={(e)=>setInput(e.target.value)} placeholder='Enter your text' rows={5} cols={100}></textarea>
        {statusMessage &&  <p style={{ color: "red" }}>{statusMessage}</p>}
        <div className="summary-button">
          <button type='submit'  id="summury-btn"  onClick={(e)=>handlesubmit(e,"short")}>Sort</button>
          <button type='submit' id="summury-btn" onClick={(e)=>handlesubmit(e,"medium")}>Medium</button>
          <button type='submit' id="summury-btn" onClick={(e)=>handlesubmit(e,"detailed")}>Detailed</button>
        </div></form>
      </div>
 {
  summary &&
  <div className="result">
  <p>Generative Result:</p>
  {summary}
 </div>
 }
    </div>
  )
}
