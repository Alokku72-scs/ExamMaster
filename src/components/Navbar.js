import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import './Navbar.css';
import jnuLogo from '../assets/jnulogo.jpg';

const Navbar = ({ user, setUser }) => {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [currentDay, setCurrentDay] = useState('');

    useEffect(() => {
        const updateTimeAndDate = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
            setCurrentDate(now.toLocaleDateString());
            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            setCurrentDay(dayNames[now.getDay()]);
        };
        updateTimeAndDate();

        // Update the time every second
        const intervalId = setInterval(updateTimeAndDate, 1000);

        // Clean up the interval on component unmount
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
                            <Link to="/about">About</Link>
                            <div className='absolute bottom-0 w-full h-0.5 bg-[#17a2b8] hidden group-hover:block transition-all duration-200'></div>
                        </li>
                        <li className="text-white font-medium hover:text-[#17a2b8] cursor-pointer transition-all duration-200 relative group">
                            <Link to="/contact">Contact</Link>
                            <div className='absolute bottom-0 w-full h-0.5 bg-[#17a2b8] hidden group-hover:block transition-all duration-200'></div>
                        </li>
                        <li className="text-white font-medium hover:text-[#17a2b8] cursor-pointer transition-all duration-200 relative group">
                            <Link to="/mock-test">Mock Test</Link>
                            <div className='absolute bottom-0 w-full h-0.5 bg-[#17a2b8] hidden group-hover:block transition-all duration-200'></div>
                        </li>
                    </ul>
                </nav>

                <div className='flex items-center gap-x-4 w-full'>
                    {!user ?
                        <>
                            <Link to="/login">
                                <button className='bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-700'>Log In</button>
                            </Link>
                            <Link to="/signup">
                                <button className='bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-50'>Signup</button>
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/">
                                <button className='bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-50' onClick={() => {
                                    setUser(null); // Clear user state to log out
                                    toast.success("Logged Out");
                                }}>Log Out</button>
                            </Link>
                            {user.role === 'admin' &&
                                <Link to="/admin-dashboard">
                                    <button className='bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-50'>Admin Dashboard</button>
                                </Link>
                            }
                            {user.role === 'student' &&
                                <Link to="/student-dashboard">
                                    <button className='bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-50'>Student Dashboard</button>
                                </Link>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar;
