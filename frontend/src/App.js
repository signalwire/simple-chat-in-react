import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from 'react';

function App() {
  const [channels, setChannels] = useState(null);
  const [username, setUsername] = useState(null);
  const [chatClient, setChatClient] = useState(null);

  const login = (username, channels, chatClient) => {
    setChannels(channels);
    setUsername(username);
    setChatClient(chatClient);

  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login onLoggedIn={login} />} />
          <Route exact path="/home" element={<Home channels={channels} username={username} chatClient={chatClient} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
