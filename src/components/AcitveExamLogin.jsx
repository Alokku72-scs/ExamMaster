import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ActiveExamLogin = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { exam, userData } = location.state || {}; // Extract the exam data
    // console.log("login page",exam);
    const isVisited = true;
    console.log("login pr user",userData);


    const [ipAddress, setIpAddress] = useState('Fetching IP...');

    useEffect(() => {
        // Fetch the IP address from a public API
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                setIpAddress(data.ip); // Set the IP address
            })
            .catch(error => {
                console.error('Error fetching IP address:', error);
                setIpAddress('Unable to fetch IP');
            });
    }, []);


    const submitHandler = (event) => {
        event.preventDefault();
        if (isVisited) {
            navigate('/student/active-exam-instruction', { state: { exam,userData } }); 
        } else {
            navigate('/student/active-exam-login',{state:{exam,userData}})
        }

    };

    return (
        <div className='flex flex-col w-full min-h-screen justify-between items-center bg-blue-950'>
            <form onSubmit={submitHandler} className='flex flex-col w-1/3 gap-y-4 mt-[10%] border p-3 bg-white'>
                <label>
                    <p>Email Address<sup className='text-pink-200 '> *</sup></p>
                    <input
                        disabled
                        type="text"
                        placeholder={ipAddress}
                        className='bg-richblack-800 rounded-[0.5rem] text-white w-full mt-2 p-[12px] disabled:bg-gray-300 cursor-not-allowed'
                    />
                </label>

                <label className='relative'>
                    <p>Password<sub className='text-pink-200'>*</sub></p>
                    <input
                        disabled
                        placeholder='**********'
                        className='bg-richblack-800 rounded-[0.5rem] text-white w-full mt-2 p-[12px] disabled:bg-gray-300 cursor-not-allowed'
                    />
                    <span
                        disabled
                        className='absolute right-3 top-[38px] cursor-pointer'>
                    </span>
                    <Link to='#' disabled >
                        <p className='text-xs mt-1 text-blue-500 max-w-max ml-auto cursor-not-allowed'>Forgot Password</p>
                    </Link>
                </label>
                <button
                    type="submit"
                    className='bg-yellow-500 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                    Login
                </button>
            </form>
        </div>
    );
}

export default ActiveExamLogin;
