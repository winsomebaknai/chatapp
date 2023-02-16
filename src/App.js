import Sidebar from './Sidebar'
import './App.css';
import Chat from './Chat';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';
import { useStateValue } from './StateProvider';



function App() {

  const[{ user }, dispatch] = useStateValue();

  return (
    <div className="app">

    {!user ? (
      <Login />
    ):( <div className="app_body"> 
    <Sidebar />   
      <Routes>
        <Route path="/rooms/:roomId" element={<Chat />}/>
        <Route path="/app" element={<Chat />}/>
      </Routes>  
      </div>
    )}
</div>
  );
}

export default App;
