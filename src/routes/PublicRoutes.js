import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import MockTest from '../pages/MockTest';
import Papper from '../components/Papper';
import Results from '../pages/Results';
import LoginFormDemo from '../components/LoginFormDemo';
import LoginForm from '../components/LoginForm';
import Instruction from '../pages/Instruction';
import FinalPage from '../pages/FinalPage';

const PublicRoutes = ({setUser}) => {
    return (
        
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/quiz" element={<MockTest />} />
                <Route path="/login" element={<LoginForm setUser={setUser} />}/>
                <Route path="/demologin" element={<LoginFormDemo />} />
                <Route path="/instruction" element={<Instruction/>}></Route>
                <Route path="/paper" element={<Papper />} />
                <Route path="/result-page" element={<Results />} />
                <Route path="/final-page" element={<FinalPage/>}></Route>
                
            </Routes>
        
    );
};

export default PublicRoutes;
