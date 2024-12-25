import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
//import './Navbar.css';
import "./Navbar.css";
import jnuLogo from "../assets/jnulogo.jpeg";
import logo from "../assets/logo.jpeg"
import { SiGnuprivacyguard } from "react-icons/si";
import { CiLogin } from "react-icons/ci";
import { RiAdminLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = ({ isLoggedIn, userRole, onLogout }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [currentDay, setCurrentDay] = useState('');
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the menu open/close state
    };

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
        <div className='w-full'>
            {/* Top Info Bar - Day, Date, Time */}
            <div className='bg-[#212529] text-white py-1 px-4'>
                <div className='flex justify-between items-center text-xs'>
                    <p>{currentDay}, {currentDate} | {currentTime}</p>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <div className='flex justify-between items-center bg-[#343a40] w-full px-4 py-2'>
                {/* Left side - Navigation Links */}

                <div className="flex items-center space-x-4">
                    <img
                        src={logo}
                        alt="JNU Logo"
                        className="h-12 w-12 border border-gray-300"
                    />
                    <h1 className="text-white font-bold text-xl">ExamMasTery</h1>
                </div>
                <nav className='flex items-center gap-x-6'>
                    <ul className="hidden md:flex gap-x-6 items-center text-white">
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
                            <Link to="/quiz">Mock Test</Link>
                            <div className='absolute bottom-0 w-full h-0.5 bg-[#17a2b8] hidden group-hover:block transition-all duration-200'></div>
                        </li>
                    </ul>

                    {/* Hamburger Icon for Mobile */}
                    <button className="md:hidden text-white" onClick={toggleMenu}>
                        <span className="block w-6 h-0.5 bg-white mb-2"></span>
                        <span className="block w-6 h-0.5 bg-white mb-2"></span>
                        <span className="block w-6 h-0.5 bg-white"></span>
                    </button>
                </nav>

                {/* Right side - User Authentication & Role-based Links */}
                <div className='flex items-center gap-x-6'>
                    {!isLoggedIn ? (
                        <>
                            <Link to="/auth/login">
                                <button className="flex items-center gap-x-2 bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-700 hover:bg-richblack-700">
                                    <CiLogin/>
                                    Log In
                                </button>
                            </Link>
                            <Link to="/auth/signup">
                                <button className="flex items-center gap-x-2 bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-50 hover:bg-richblack-700">
                                <SiGnuprivacyguard />
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <button
                                className='bg-[#1f1f1f] text-white py-2 px-4 rounded-lg border border-[#444] hover:bg-[#333]'
                                onClick={() => {
                                    onLogout();
                                    toast.success("Logged Out");
                                    navigate('/'); // Redirect to home after logout
                                }}
                            >
                                Logout
                            </button>
                            {userRole === 'Admin' && (
                                <Link to="/admin/admin-dashboard">
                                    <button className='bg-[#1f1f1f] text-white py-2 px-4 rounded-lg border border-[#444] hover:bg-[#333]'>
                                        Admin Dashboard
                                    </button>
                                </Link>
                            )}
                            {userRole === 'Student' && (
                                <Link to="/student/student-dashboard">
                                    <button className='bg-[#1f1f1f] text-white py-2 px-4 rounded-lg border border-[#444] hover:bg-[#333]'>
                                        Student Dashboard
                                    </button>
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu - Toggle visibility based on isMenuOpen state */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-[#343a40] py-4 px-4`}>
                <ul className="text-white">
                    <li className="text-white font-medium hover:text-[#17a2b8] cursor-pointer transition-all duration-200">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="text-white font-medium hover:text-[#17a2b8] cursor-pointer transition-all duration-200">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="text-white font-medium hover:text-[#17a2b8] cursor-pointer transition-all duration-200">
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li className="text-white font-medium hover:text-[#17a2b8] cursor-pointer transition-all duration-200">
                        <Link to="/quiz">Mock Test</Link>
                    </li>
                </ul>
            </div>
        </div>

    );
};

export default Navbar;
