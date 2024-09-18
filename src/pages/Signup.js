import React from 'react';
import Template from '../components/Template';

const Signup = ({ setUser }) => {
    return (
        <Template
            title="Join the millions learning to code with StudyNotation for free."
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your career."
            //image={signup}
            formType="signup"
            setUser={setUser}
        />
    );
}

export default Signup;
