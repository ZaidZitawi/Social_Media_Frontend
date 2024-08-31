import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from "./reportWebVitals";
import SignIn from "./Components/Landing Page Components/SignIn.jsx";
import SignUp from "./Components/Landing Page Components/SignUp.jsx";
import PostForm from "./Components/PostForm.jsx";
import Home from "./Pages/home.jsx";
import './index.css';  
import ProfilePage from "./Pages/ProfilePage.jsx";
import Logout from "./Components/Landing Page Components/Logout.jsx";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Router>
     
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/addPost" element={<PostForm />} />    
        <Route path="/home" element={<Home/>} />
        <Route path="/ProfilePage" element={<ProfilePage/>} />
        <Route path="/logout" element={<Logout/>} />

        
      </Routes>
    </Router>
  </StrictMode>
);

reportWebVitals();
