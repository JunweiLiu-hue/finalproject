import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';  
import RegisterPage from './pages/RegisterPage';  
import HomePage from './pages/HomePage';
import LandingPage from './landingPage';
import MallPage from './pages/MallPage';
import UserCardsPage from './pages/UserCardsPage';
import CardDetailPage from './pages/CardDetailPage';
import WarehousePage from './pages/WareHousePage';
import StoryPage from './pages/StoryPage';
import StoryDetail from './pages/StoryDetail';
import ActivityPage from './pages/ActivityPage';
import PersonalPage from './pages/PersonalPage';
import GenerateCardPage from './pages/GenerateCardPage';
import EditProfilePage from './pages/EditProfilePage';
import CustomCardsPage from './pages/CustomCardsPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />  
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/homePage" element={<HomePage />} /> 
                <Route path="/landingPage" element={<LandingPage />} />
                <Route path="/mallPage" element={<MallPage />} /> 
                <Route path="/userCardsPage" element={<UserCardsPage />} />
                <Route path="/cardDetail/:cardId" element={<CardDetailPage />} />
                <Route path="/warehouse" element={<WarehousePage />} />
                <Route path="/stories" element={<StoryPage />} />
                <Route path="/story/:id" element={<StoryDetail />} />
                <Route path="/activities" element={<ActivityPage />} />
                <Route path="/personal" element={<PersonalPage />} />
                <Route path="/generateCard" element={<GenerateCardPage />} /> 
                <Route path="/edit-profile" element={<EditProfilePage />} />
                <Route path="/myCustomCardsPage" element={<CustomCardsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
