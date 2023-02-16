import React, { useEffect,useState } from 'react'
import Avatar  from "@mui/material/Avatar";
import { IconButton } from '@mui/material';
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from '@mui/icons-material/Search';
import './Sidebar.css'
import SidebarChat from './SidebarChat';
import db from './Firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const[{ user }, dispatch] = useStateValue();

    useEffect(() => {
        db.collection("rooms").onSnapshot(snapshot =>(setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
        })
        ))));
    },[]);

  return (
   <div className="sidebar">
    <div className="sidebae_header">
        <Avatar src={user?.photoURL}/>
        <div className="sidebar_headerRight">
            <IconButton>
            <DonutLargeIcon />
            </IconButton>
            <IconButton>
                <ChatIcon />
            </IconButton>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
          
            

        </div>
    </div>

    <div className="sidebar_search">
        <div className="sidebar_searchContainer">
        <SearchIcon />
        <input placeholder='Search' type="text" />
        </div>
    </div>

    <div className="sidebar_chats">
       <SidebarChat addNewChat/>
      {rooms.map(room => (
        <SidebarChat key={room.id} id={room.id} 
        name={room.data.name} />
      ))}
    </div>

   </div>
  )
}

export default Sidebar