import React,{useState,useEffect} from 'react'
import "./App.css"
import Message from './Message';
import { TextField } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import db from './firebase';
import firebase from "firebase";
import FlipMove from "react-flip-move";
function App() {
  const[input,setInput]=useState();
  const [messages,setMessages]=useState([
]);
const[username,setUsername]=useState();
  console.log(input);
  console.log(messages)

  const sendMessage=(e)=>{
    e.preventDefault();
    db.collection("texts").add({
      message:input,
      username:username,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput("");
  }
  useEffect(()=>{
    db.collection("texts").orderBy("timestamp","desc").onSnapshot(snapshot=>{
      setMessages(snapshot.docs.map(doc=>({id:doc.id,message:doc.data()})))
    })
  },[])
  useEffect(()=>{
    setUsername(prompt("Enter ur Name.."));

  },[])
  return (

    <div className="app">
      <img className='app__logo' src="https://messengernews.fb.com/wp-content/themes/messenger/images/messenger_logo_1200x630.jpg" alt="message-logo"/>
      <form className="app__form">
      <TextField className="app__input" autoComplete="off" id="standard-basic" label="Enter the Messages..." value={input} onChange={e=>setInput(e.target.value)} />
      <Button className="app__butto" variant="contained" type="submit" disabled={!input} onClick={sendMessage} >send</Button>
      </form>

 
     <FlipMove>
     {
        messages.map(({message,id})=>(
          <Message key={id} id={id} username={username} message={message}/>
        ))
      }
     </FlipMove>
     
    </div>
  )
}

export default App
