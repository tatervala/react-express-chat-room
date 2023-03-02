import './App.css';
import { useState } from 'react';
import io from 'socket.io-client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JoinPage from './pages/joinpage';

const socket = io.connect('http://localhost:4000/') // socket server


function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<JoinPage 
        username={username} setUsername={setUsername} 
        room={room} setRoom={setRoom} socket={socket}
        />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
