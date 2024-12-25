import React from 'react';
import frameImage from '../assets/techsavvy.jpg';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { FcGoogle } from 'react-icons/fc';
import { useState, useEffect } from 'react';

const quotes = [
    "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "It does not matter how slowly you go as long as you do not stop. – Confucius",
    "Hardships often prepare ordinary people for an extraordinary destiny. – C.S. Lewis",
    "The only way to do great work is to love what you do. – Steve Jobs"
];

const Template = ({ title, desc1, desc2, image, formType, setUser }) => {

    const [randomQuote, setRandomQuote] = useState('');

    useEffect(() => {
        // Get a random quote from the array
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setRandomQuote(quotes[randomIndex]);
    }, []);
    return (
        //     <div className="flex justify-center w-11/12 max-w-[1160px] py-12 mx-auto gap-x-20 gap-y-8">
        //     <div className="w-11/12 max-w-[450px]">
        //         <h1 className="text-green-700 font-bold text-[2rem]">{title}</h1>
        //         <p className="text-[1.125rem] leading-[1.2rem] mt-3">
        //             <span className="text-blue-800">{desc1}</span> <br />
        //             <span className="text-blue-600 italic">{desc2}</span>
        //         </p>

        //         {formType === "signup" ? (
        //             <SignupForm setUser={setUser} />
        //         ) : (
        //             <LoginForm setUser={setUser} />
        //         )}

        //         <div className="flex w-full items-center my-4 gap-x-2">
        //             <div className="w-full h-[1px] bg-richblack-700"></div>
        //             <p className="text-richblack-700 font-medium leading[1.375]">OR</p>
        //             <div className="w-full h-[1px] bg-richblack-700"></div>
        //         </div>

        //         <button className="w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100 border border-richblack-700 px-[12px] py-[12px] gap-x-2 mt-6">
        //             <FcGoogle />
        //             <p className="text-green-800">Sign Up With Google</p>
        //         </button>
        //     </div>

        //     <div className="relative w-11/12 max-w-[450px]">
        //         <div className="relative aspect-w-16 aspect-h-9">
        //             <img
        //                 src={frameImage}
        //                 alt="Pattern"
        //                 className="w-full h-full object-cover"
        //                 loading="lazy"
        //             />
        //         </div>

        //         <div className="absolute bottom-0 left-0 right-0 bg-opacity-70 bg-black p-4 text-white text-center rounded-b-[8px]">
        //             <p className="italic">{randomQuote}</p>
        //         </div>

        //         <img
        //             src={image}
        //             alt="Pattern"
        //             className="absolute top-[20px] right-0 w-[80%] h-auto"
        //             loading="lazy"
        //         />
        //     </div>
        // </div>


        <div className="flex flex-col items-center justify-center w-full py-12 mx-auto gap-8">
      {/* Heading: Centered at the top */}
      <h1 className="text-green-700 font-bold text-3xl mb-6">{title}</h1>

      {/* Main Content: Form and Image */}
      <div className="flex flex-col lg:flex-row w-full justify-center items-center max-w-[1160px] gap-8 px-4">
        {/* Left Section: Form and Description */}
        <div className="w-full max-w-[450px] text-center lg:text-left">
          <p className="text-lg leading-relaxed mt-3">
            <span className="text-blue-800">{desc1}</span> <br />
            <span className="text-blue-600 italic">{desc2}</span>
          </p>

          {/* Form */}
          {formType === "signup" ? (
            <SignupForm setUser={setUser} />
          ) : (
            <LoginForm setUser={setUser} />
          )}

          <div className="flex w-full items-center my-4 gap-2">
            <div className="w-full h-[1px] bg-richblack-700"></div>
            <p className="text-richblack-700 font-medium leading-[1.375rem]">OR</p>
            <div className="w-full h-[1px] bg-richblack-700"></div>
          </div>

          <button className="w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100 border border-richblack-700 px-4 py-3 gap-x-2 mt-6">
            <FcGoogle />
            <p className="text-green-800">Sign Up With Google</p>
          </button>
        </div>

        {/* Right Section: Image and Quote */}
        <div className="relative w-full max-w-[450px] text-center lg:text-left">
          <div className="relative aspect-w-16 aspect-h-9 border-4">
            <img
              src={frameImage}
              alt="Pattern"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-opacity-70 bg-black p-4 text-white text-center rounded-b-[8px]">
            <p className="italic">{randomQuote}</p>
          </div>

          <img
            src={image}
            alt="Pattern"
            className="absolute top-[20px] right-0 w-[80%] h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </div>
    );
}

export default Template;
