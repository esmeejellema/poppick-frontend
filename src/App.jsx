import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import Quiz from './pages/Quiz.jsx';
import Lists from './pages/Lists.jsx';
import './App.css';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/lists" element={<Lists />} />
            </Routes>
        </Router>
    );
}

export default App;
