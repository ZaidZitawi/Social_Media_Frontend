import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from "./reportWebVitals";
import SignIn from "./Components/SignIn.jsx";
import SignUp from "./Components/SignUp.jsx";
import PostForm from "./Components/PostForm.jsx";
import Header from "./Components/header.jsx";
import Sidebar from './Components/SideBar/Sidebar.jsx';
import FriendSuggestions from "./Components/FriendSuggestions.jsx";
import LandingPage from "./Pages/landingPage.jsx";
import Home from "./Pages/home.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Router>
     
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/addPost" element={<PostForm />} />    
        <Route path="/home" element={<Home/>} />
        
      </Routes>
    </Router>
  </StrictMode>
);

reportWebVitals();
