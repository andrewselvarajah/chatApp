import React, { Component, useState } from 'react'
import axios from "./axios";

function Chat({messages}){

  const [input, setInput] = useState('');
  const sendMessage = async (e) =>{
    e.preventDefault();
    
    await axios.post('/messages/new', {
      "message": input,
      "name": "Andyrew", 
      "timestamp": "check", 
      "received": true
    });
    setInput('');
  };
  
    return (
      <>
        <div className="chat_header">
          <h1>your name here</h1>
        </div>
        <div className="chat_body">
          {messages.map((message) => (
            <p className={`chat_message  ${message.received && 'chat_reciever'}`}>
              <span className="chat_name">
              {message.name}
              </span>
              {message.message}
              <span className="chat_timestamp">
                {message.timestamp}
              </span>
            </p>
          ))}
          </div>           
        <div class="chat_footer">
          <form action="" class="">
            <input value = {input} onChange = {e => setInput(e.target.value)}
            placeholder="Type Here"
            type="text"></input>
            <button onClick= {sendMessage} type="submit">Send Message</button>


          </form>

          
        </div>
        

      </>
    )
  }


export default Chat
