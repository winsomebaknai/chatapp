import { AttachFile, InsertEmoticon, MoreVert, Search } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import db from './Firebase';
import { useStateValue } from './StateProvider';



function Chat() {

    const [input,setInput] = useState("");
    const [seed, setseed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const[{ user }, dispatch] = useStateValue();

    useEffect(()=> {
            if(roomId){
                db.collection("rooms").doc(roomId).onSnapshot((snapshot) => 
                    setRoomName(snapshot.data().name));
                
                db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot => (setMessages(snapshot.docs.map(doc => doc.data()))
             ))    
            }
    }, [roomId]);

    useEffect(()=>{
        setseed(Math.floor(Math.random()*5000));
    },[roomId]);


    const sendMessage = (e) =>{
        e.preventDefault();
        console.log(input);

        db.collection('rooms').docs(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
    };

  return (
    <div className='chat'>
       <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

            <div className="chat_headerInfo">
                <h3>{roomName}</h3>
                
            </div>

            <div className="chat_headerRight">
                <IconButton>
                    <Search />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
       </div>

       <div className="chat_body">
            {messages.map((message) => (
                <p className={`chat_message  
                ${message.name == user.displayName && "chat_reciever"}`}>
                <span className='chat_name'>
                    {message.name}
                </span>
               {message.message}
               <span className="chat_timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
               </span>
                </p>
            ))}
            
       </div>

       <div className="chat_footer">
            <InsertEmoticon />
            <form action="">
                <input value={input} onChange={e =>setInput(e.target.value)}  placeholder='Type a message' type="text" />
                <button onClick={sendMessage} type='submit'>Sent a message</button>
                <SendIcon />
            </form>
            <MicIcon />
            
       </div>
    </div>
  )
}

export default Chat