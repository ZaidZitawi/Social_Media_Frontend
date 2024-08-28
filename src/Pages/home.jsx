import React from 'react';
import '../Styles/home.css'; 
import Header from '../Components/header.jsx';
import Sidebar from '../Components/SideBar/Sidebar.jsx';
import FriendSuggestions from '../Components/FriendSuggestions';
import MainArea from '../Components/MainArea';
import PostCreator from '../Components/postCreator.jsx';
import PostsList from '../Components/PostsList';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <Sidebar />
        <MainArea />
        <FriendSuggestions />
      </div>
    </div>
  );
};

export default Home;
