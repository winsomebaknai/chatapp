import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import db from './Firebase';
import './SidebarChat.css'
import { Link } from 'react-router-dom';

function SidebarChat({ id, name, addNewChat }) {
const [seed, setseed] = useState("");

    useEffect (() =>{
        setseed(Math.floor(Math.random() * 5000));
    },[])

    const createChat = () => {
      const roomName = prompt("Please enter name for the chat");

      if (roomName) {
        //do some clever stuff ...
        db.collection("rooms").add({
          name: roomName,
        });
      }
    };


  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
       <div className='sidebarChat'>
    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
    <div className="sidebarChat_info">
        <h2>{name}</h2>
     </div>
    </div>
    </Link>
   
  ): (
    <div onClick={createChat}
    className="sidebarChat">
        <h2>Add new Chat</h2>

    </div>
  );
}

export default SidebarChat