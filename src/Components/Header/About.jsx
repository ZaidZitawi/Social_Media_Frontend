import React from 'react';
import '../../Styles/About.css'; // Import the CSS file for styling
import photo1 from '../../images/ahmAD.jpg';
import photo2 from '../../images/wa.png';
import photo3 from '../../images/zaid.jpg';
import photo4 from '../../images/mousa.png';
import Sidebar from '../SideBar/Sidebar';
import Header from './header';

const About = () => {
    return (
        <div className="about-page">
             <Sidebar/>
            <Header/>
            <h1 className="about-title">About Us</h1>
            <div className="about-grid">
                <div className="about-item">
                    <img src={photo1} alt="Description 1" className="about-image" />
                    <p className="about-description">Trainer <b> Ahmed Salameh </b>
                    The main trainer and employee at Apple ,He is a Software Engineer leader</p>
                </div>
                <div className="about-item">
                    <img src={photo2} alt="Description 2" className="about-image" />
                    <p className="about-description">Trainer <b> Waleed Shuaib </b>
                     The main trainer and employee at Apple ,He is a Software Engineer</p>
                </div>
                <div className="about-item">
                    <img src={photo3} alt="Description 3" className="about-image" />
                    <p className="about-description"><b> Zaid Zitawi </b>
                    Apple back-end trainee and one of the developers of this site</p>
                </div>
                <div className="about-item">
                    <img src={photo4} alt="Description 4" className="about-image" />
                    <p className="about-description"> <b> Mousa Shuaib </b>
                    Apple back-end trainee and one of the developers of this site</p>
                </div>
            </div>
        </div>
    );
};

export default About;
