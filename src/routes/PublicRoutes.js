import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import MockTest from '../pages/MockTest';
import Papper from '../components/Papper';
import Results from '../pages/Results';
import LoginFormDemo from '../components/LoginFormDemo';

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/public/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quiz" element={<MockTest />} />
            <Route path="/demologin" element={<LoginFormDemo />} />
            <Route path="/paper" element={<Papper />} />
            <Route path="/result-page" element={<Results />} />
        </Routes>
    );
};

export default PublicRoutes;
