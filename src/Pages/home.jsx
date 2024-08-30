import React from 'react';
import '../Styles/home.css'; 
import Header from '../Components/Header/header.jsx';
import Sidebar from '../Components/SideBar/Sidebar.jsx';
import FriendSuggestions from '../Components/Friendship/FriendSuggestions.jsx';
import MainArea from '../Components/MainArea';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
          <Sidebar />
        <div className="main-area">
          <MainArea />
        </div>
        <div className="friend-suggestions">
          <FriendSuggestions />
        </div>
      </div>
    </div>
  );
};

export default Home;
