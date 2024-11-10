import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';


const LoginForm = ({ setUser }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

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
                navigate(data.role === "Admin" ? "/admin-dashboard" : "/student-dashboard");
                //navigate('/instruction');
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error(error);
        }
    }

    return (
        <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-4 mt-6'>
            <label>
                <p>Email Address<sup className='text-pink-200'> *</sup></p>
                <input
                    type="text"
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder='Enter email id'
                    name='email'
                    className='bg-richblack-800 rounded-[0.5rem] text-white w-full p-[12px]'
                />
            </label>

            <label className='relative'>
                <p>Password<sub className='text-pink-200'>*</sub></p>
                <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder='Enter Password'
                    name='password'
                    className='bg-richblack-800 rounded-[0.5rem] text-white w-full p-[12px]'
                />
                <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setShowPassword(prev => !prev)}>
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
