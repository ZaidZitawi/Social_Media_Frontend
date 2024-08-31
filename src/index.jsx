import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from "./reportWebVitals";
import SignIn from "./Components/Landing Page Components/SignIn.jsx";
import SignUp from "./Components/Landing Page Components/SignUp.jsx";
import PostForm from "./Components/PostForm.jsx";
import Home from "./Pages/home.jsx";
import Post from "./Components/PostComponents/Post.jsx";
import UserPostData from "./Components/PostComponents/UserPostData.jsx";
import LandingPage from "./Pages/landingPage.jsx";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Router>
     
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/addPost" element={<PostForm />} />    
        <Route path="/home" element={<Home/>} />
        <Route path="/post" element={<PostForm />} />
        <Route path="/k" element={<Post />} />
        <Route path="/p" element={<UserPostData />} />
        <Route path="/land" element={<LandingPage />} />
        
      </Routes>
    </Router>
  </StrictMode>
);

reportWebVitals();
