import React from "react";
// import {useNavigate } from 'react-router-dom';

const  About=()=>{
    // const navigate = useNavigate();
    return (
        <div className='flex items-center justify-center h-full text-3xl text-black'>
            <h2>About Page </h2>
            {/* <button onClick={() => navigate('/abc')}> Second Page </button>     */}
            <a href="/abc">press</a>            
    
        </div>
    )
}

export default About;