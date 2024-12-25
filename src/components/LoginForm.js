import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCallback } from 'react';
import img from '../assets/abc.jpg';


const LoginForm = ({ setUser }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }


    const fetchStudentDetails = useCallback(async () => {
        try {
            console.log("Fetching details for", formData.email);
            const response = await axios.get(`http://localhost:5000/api/v1/users/${formData.email}`);
            const userDat = response.data;
            console.log("Fetched user data", userDat);
            return userDat;  // Return the user data
        } catch (err) {
            console.error('Error fetching student details:', err.response?.data || err.message);
            setError('Failed to load exams. Please try again later.');
            return null;
        }
    }, [formData.email]); // Dependency on formData.email

    async function submitHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                setUser({ loggedIn: true, role: data.role }); // Set user state
                toast.success("Logged In");

                // Fetch student details after successful login
                const fetchedUserData = await fetchStudentDetails(); // Wait for the fetch to complete
                if (fetchedUserData) {
                    console.log("User data after fetch", fetchedUserData);
                    // Navigate to the appropriate dashboard with the fetched userData
                    navigate(data.role === "Admin" ? "/admin/admin-dashboard" : "/student/student-dashboard", { state: { userData: fetchedUserData } });
                }
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error(error);
        }
    }

    return (


        <form className='flex flex-col margin:auto'
            onSubmit={submitHandler} >
            <label>
                <p className='font-medium'>Email Address<sup className='text-pink-500 font-extrabold'> *</sup></p>
                <input
                    type="text"
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder='Enter email id'
                    name='email'
                    className='bg-white border-2 rounded-[0.5rem] text-black w-full p-[12px] mb-2 mt-2 font-serif'
                />
            </label>

            <label className='relative mt-2'>
                <p className='font-medium'>Password<sup className='text-pink-400 font-extrabold'>*</sup></p>
                <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder='Enter Password'
                    name='password'
                    className='bg-white border-2 rounded-[0.5rem] text-black w-full p-[12px] mt-2 font-serif'
                />
                <span className='absolute right-3 top-[50px] cursor-pointer' onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
                <Link to='#'>
                    <p className='text-xs mt-1 text-blue-500 max-w-max ml-auto'>Forgot Password</p>
                </Link>
            </label>
            <button className='bg-yellow-500 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                Login
            </button>
        </form>

    );
}

export default LoginForm;
