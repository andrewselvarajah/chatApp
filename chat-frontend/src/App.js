import React from 'react';
import './App.css';
import Chat from './Chat';

function App() {
  return (
    <div className="app">
      <div className="app_body">
        <div className="chat_header">
          <h1>your name here</h1>
        </div>
        <div className="chat_body">
          <p class="chat_message">
            <span class="chat_name">
            ANDREW
            </span>
            MESSAGE
            <span class="chat_timestamp">
              {new Date().toUTCString()}

            </span>
          </p>
          <p class=" chat_message chat_reciever">
            <span class="chat_name">
            ANDREW
            </span>
            MESSAGE
            <span class="chat_timestamp">
              {new Date().toUTCString()}

            </span>
          </p>
          
        </div>
        <div class="chat_footer">
          <form action="" class="">
            <input placeholder="Type Here" type="text"></input>
            <button type="submit">Send Message</button>


          </form>

          
        </div>

      </div>
      
    </div>
  );
}



export default App;
