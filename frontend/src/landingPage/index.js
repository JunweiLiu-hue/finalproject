import React from 'react';
import './LandingPage.css';
import picture from './picture.jpg';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <h1 className="landing-title">SETU Final Year Project</h1>
            <img src={picture} alt="Profile" className="landing-image-centered" />
            <h2 className="landing-name">Junwei Liu</h2>
            <p className="landing-description">
                <strong>Project Overview</strong>
            </p>
            <p className="landing-description">
                The Three Kingdoms Card Shop Simulator is a digital card game inspired by the Three Kingdoms period in China.
                Built with React.js, Spring Boot, and MySQL, it allows users to register, buy card packs, collect character cards, and
                trade them using virtual currency. A probability-based system enhances the excitement of collecting rare cards. Users can manage
                collections, trade cards, and browse a virtual marketplace, while administrators oversee user accounts and inventory. The system
                follows an MVC architecture and Agile methodology to ensure an engaging gaming experience.
            </p>
            <p><strong>Video Demo:</strong> <a href="https://youtu.be/3ISvSYh8XJI" className="landing-link">https://youtu.be/3ISvSYh8XJI</a></p>
            <p><strong>GitHub Link:</strong> <a href="https://github.com/JunweiLiu-hue/finalproject.git" className="landing-link">https://github.com/JunweiLiu-hue/finalproject.git</a></p>
        </div>
    );
};

export default LandingPage;