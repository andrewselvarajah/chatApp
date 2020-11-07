import React, {useEffect, useState} from 'react';
import './App.css';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios'




function App() {

  const [messages, setMessages] = useState([]);
  // Using useState to only run once when page loads
  const [username, setUsername] = useState(()=>{
    console.log("Check");
    return (prompt("What is your username?", ""));

  });


  function getUsername(){
    setUsername(prevState => prompt("What is your Username?", ""));

  }
  useEffect(() => {
    axios.get('/messages/sync').then((response) =>{
      setMessages(response.data);
    });
  }, []);
//function to get username
  function getUsername(){
    return (prompt("What is your Username?", ""));
  }

//Checks if a new message has been added to the database
  useEffect(()=>{
     const pusher = new Pusher('15e56383a4cb584bebb7', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage]);
    });
 
  //unbinds channels
    return() => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages])

  return (
    <div className="app" >
      <div className="app_body">
        <Chat messages={messages} username= {username}/>

      </div>
       
    </div>
  );
}



export default App;
