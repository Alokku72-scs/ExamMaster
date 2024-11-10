import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
//import './Navbar.css';

const Navbar = ({ isLoggedIn, userRole, onLogout }) => {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [currentDay, setCurrentDay] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const updateTimeAndDate = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
            setCurrentDate(now.toLocaleDateString());
            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            setCurrentDay(dayNames[now.getDay()]);
        };
        updateTimeAndDate();

        const intervalId = setInterval(updateTimeAndDate, 1000);
        return () => clearInterval(intervalId);
    }, []);

    
    return (
        <div className='flex flex-col w-screen'>
            <div className='bg-gray-900 w-full h-auto pt-0 pb-0 px-4 mb-0.1'>
                <div className='flex flex-row items-center space-x-4'>
                    <p className='text-white text-xs'>{currentDay},</p>
                    <p className='text-white text-xs'>{currentDate}</p>
                    <p className='text-white text-xs'>{currentTime}</p>
                </div>
            </div>

            <div className='flex justify-between items-center bg-[#343a40] w-full mx-auto'>
                <nav className='flex justify-center w-full'>
                    <ul className="flex gap-x-6 items-center text-white">
                        <li className="text-white font-medium hover:text-[#17a2b8] cursor-pointer transition-all duration-200 relative group">
                            <Link to="/">Home</Link>
                            <div className='absolute bottom-0 w-full h-0.5 bg-[#17a2b8] hidden group-hover:block transition-all duration-200'></div>
                        </li>
                        <li className="text-white font-medium hover:text-[#17a2b8] cursor-pointer transition-all duration-200 relative group">
                            <Link to="/public/about">About</Link>
                            <div className='absolute bottom-0 w-full h-0.5 bg-[#17a2b8] hidden group-hover:block transition-all duration-200'></div>
                        </li>
                        <li className="text-white font-medium hover:text-[#17a2b8] cursor-pointer transition-all duration-200 relative group">
                            <Link to="/contact">Contact</Link>
                            <div className='absolute bottom-0 w-full h-0.5 bg-[#17a2b8] hidden group-hover:block transition-all duration-200'></div>
                        </li>
                        <li className="text-white font-medium hover:text-[#17a2b8] cursor-pointer transition-all duration-200 relative group">
                            <Link to="/quiz">Mock Test</Link>
                            <div className='absolute bottom-0 w-full h-0.5 bg-[#17a2b8] hidden group-hover:block transition-all duration-200'></div>
                        </li>
                    </ul>
                </nav>

                <div className='flex ml-auto items-center gap-x-6'>
                    {!isLoggedIn ? (
                        <>
                            <Link to="/auth/login">
                                <button className='bg-richblack-800 text-white py-[8px] px-[12px]  rounded-[8px] border border-richblack-700 '>LogIn</button>
                            </Link>
                            <Link to="/signup">
                                <button className='bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-50 mr-3'>Signup</button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <button
                                className='bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-50'
                                onClick={() => {
                                    onLogout(); // Call the onLogout prop to handle logout
                                    toast.success("Logged Out");
                                    navigate('/'); // Redirect to home page after logging out
                                }}
                            >
                                Logout
                            </button>
                            {userRole === 'Admin' && (
                                <Link to="/admin-dashboard">
                                    <button className='bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-50 mr-3'>AdminDashboard</button>
                                </Link>
                            )}
                            {userRole === 'Student' && (
                                <Link to="/student-dashboard">
                                    <button className='bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-50 mr-3'>StudentDashboard</button>
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
