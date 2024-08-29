import React, {useEffect,useState} from 'react'
// import logo from "../assets/logo.jpg"
import {Link} from "react-router-dom"
import { toast } from 'react-hot-toast'
const Navbar=(props) =>{

    let isLoggedIn=props.isLoggedIn;
    let setIsLoggedIn=props.setIsLoggedIn; 

    const [currentTime,setCurrentTime] = useState('');
    const [currentDate,setCurrentDate] = useState('');
    const [currentDay,setCurrentDay] = useState('');
    function CurrentTimeAndDate(){
        

        useEffect(()=>{
            const updateTimeAndDate= ()=>{
                const now=new Date();
                setCurrentTime(now.toLocaleTimeString());
                setCurrentDate(now.toLocaleDateString());
                const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                setCurrentDay(dayNames[now.getDay()]);
            };
            updateTimeAndDate();

            //Update the time every second
            const intervalId = setInterval(updateTimeAndDate,1000);

          

            //clean up the interval on component unmount
            return ()=> clearInterval(intervalId);
        },[]);
    }


    CurrentTimeAndDate();



    return (
        <div className='flex flex-col  w-screen    '>
            <div className='bg-blue-400 w-full'>
                <div className='flex flex-row '>
                <p>{currentDay},</p>
                <p>{currentDate}-</p>
                <p>{currentTime}</p>
                </div>
            </div>
            <div className='flex justify-between items-center bg-lime-700 w-full mx-auto'>
            <Link to="/">
                {/* <img  src={logo}
                alt="logo" width={80} height={40} loading="lazy" /> */}
            </Link>

            <nav>
                <ul className='flex gap-x-6 text-white'>
                    <li>
                        <Link to="/">Home</Link> 
                    </li>
                    <li>
                        <Link to="/about">About</Link> 
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link> 
                    </li>
                    {/* //Mock Test button */}

                    <li>
                        <Link to="/mock-test">Mock Test</Link>
                    </li>
                </ul>  
            </nav>

            {/* Login-signup-logout-dashboard */}

            <div className='flex items-center gap-x-4'>
                {
                    !isLoggedIn &&
                    <Link to="/login">
                        <button className='bg-richblack-800 text-white 
                        py-[8px] px-[12px] rounded-[8px] border border-richblack-700'>Log  in</button>
                    </Link>
                }
                 {
                     !isLoggedIn &&
                    <Link to="/signup">
                        <button className='bg-richblack-800 text-white 
                        py-[8px] px-[12px] rounded-[8px] border border-richblack-50'
                         onClick={()=>{
                            setIsLoggedIn(false);
                        }}>Signup</button>
                    </Link>
                }
                 {
                    isLoggedIn &&
                    <Link to="/">
                        <button className='bg-richblack-800 text-white 
                        py-[8px] px-[12px] rounded-[8px] border border-richblack-50'
                        onClick={()=>{
                            setIsLoggedIn(false);
                            toast.success("Logged Out");
                            console.log("logged out");
                        }}>Log Out</button>
                    </Link>
                }
                 {
                     isLoggedIn &&
                    <Link to="/dashboard">
                        <button className='bg-richblack-800 text-white 
                        py-[8px] px-[12px] rounded-[8px] border border-richblack-50'>Dashboard</button>
                    </Link>
                }
            </div>
            </div>
        </div>
    )
}

export default Navbar