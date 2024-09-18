import React from 'react';
import Template from '../components/Template';

const Login = ({ setUser }) => {
    return (
        <Template
            title="Welcome Back"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your career."
            //image={loginImg}
            formType="login"
            setUser={setUser}
        />
    );
}

export default Login;
