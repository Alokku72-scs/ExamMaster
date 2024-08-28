import React from 'react';
import Template from '../components/Template'
//import loginImg from '../assets/loginImg.jpg'



const Login=({setIsLoggedIn})=>{
    return (
        <Template
        title="Welcome Back"
        desc1="build Skills for today, tommorow, and beyond."
        desc2="Education to future-proof career."
        //image={loginImg}
        formtype="login"
        setIsLoggedIn={setIsLoggedIn}
        />
    )
}

export default Login;