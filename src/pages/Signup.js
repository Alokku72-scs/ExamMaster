import React from 'react';
import Template from '../components/Template';

const Signup = ({ setUser }) => {
    return (
        <Template
            title="Patient Singn Up Form"
            // desc1="Patient Singn Up Form"
            // desc2="Education to future-proof your career."
            //image={signup}
            formType="signup"
            setUser={setUser}
        />
    );
}

export default Signup;
