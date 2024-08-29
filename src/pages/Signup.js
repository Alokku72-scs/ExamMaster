import React from "react";
import Template from "../components/Template";
const Signup=({setIsLoggedIn})=>{
    return (
        <Template
       title="Join the milloins learning to code with StudyNotation for free."
       desc1="Build skills for today, tommorow, and beyond."
       desc2="Education to future-proof your career."
       //image={signup}
       formType="signup"
       setIsLoggedIn={setIsLoggedIn}
       />
    )
}

export default Signup;