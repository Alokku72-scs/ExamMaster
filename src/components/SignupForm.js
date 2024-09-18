import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignupForm = ({ setUser }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const navigate = useNavigate();

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    function submitHandler(event) {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }
        setUser({ loggedIn: true, role: 'user' }); // Assume 'user' role for signup
        toast.success("Account Created");
        navigate("/login");
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className='flex justify-between'>
                    <label>
                        <p className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>
                            First Name<sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            placeholder='Enter First Name'
                            value={formData.firstName}
                            className='bg-green-950 rounded-[0.5rem] text-white w-full p-[12px]'
                        />
                    </label>
                    <label>
                        <p className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>
                            Last Name<sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder='Enter Last Name'
                            value={formData.lastName}
                            className='bg-green-950 rounded-[0.5rem] text-white w-full p-[12px]'
                        />
                    </label>
                </div>
                <label>
                    <p className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>
                        Email Address<sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="email"
                        onChange={changeHandler}
                        placeholder='Enter Email'
                        value={formData.email}
                        className='bg-green-950 rounded-[0.5rem] text-white w-full p-[12px]'
                    />
                </label>
                <label className='relative'>
                    <p className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>
                        Password<sub className='text-pink-200'>*</sub>
                    </p>
                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={changeHandler}
                        placeholder='Enter Password'
                        value={formData.password}
                        className='bg-green-950 rounded-[0.5rem] text-white w-full p-[12px]'
                    />
                    <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </label>
                <label className='relative'>
                    <p className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>
                        Confirm Password<sub className='text-pink-200'>*</sub>
                    </p>
                    <input
                        required
                        type={showPassword1 ? "text" : "password"}
                        name="confirmPassword"
                        onChange={changeHandler}
                        placeholder='Confirm Password'
                        value={formData.confirmPassword}
                        className='bg-green-950 rounded-[0.5rem] text-white w-full p-[12px]'
                    />
                    <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setShowPassword1(prev => !prev)}>
                        {showPassword1 ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </label>
                <button className='bg-yellow-500 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignupForm;
