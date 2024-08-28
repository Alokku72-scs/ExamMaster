import React from 'react';
import frameImage from '../assets/frame.png';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { FcGoogle } from 'react-icons/fc';

const Template =({title,desc1,desc2,image,formType,setIsLoggedIn})=>{
    return (
        <div className='flex justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-x-20 gap-y-8'>

            <div className='w-11/12 max-w-[450px]'>
                <h1 className='text-white font-semibold text'>{title}</h1>
                <p className='text-[1.125rem] leading-[1.635rem] mt-4'>
                    <span className='text-blue-200'>{desc1}</span> <br/>
                    <span className='text-blue-600 italic'>{desc2}</span>
                </p>

                {formType==="signup" ?
                (<SignupForm setIsLoggedIn={setIsLoggedIn}/>) : (<LoginForm setIsLoggedIn={setIsLoggedIn}/>)}

                <div className='flex w-full items-center my-4 gap-x-2'>
                    <div className='w-full h-[1px] bg-richblack-700'></div>

                    <p className='text-richblack-700 font-medium leading[1.375]'>OR</p>

                    <div className='w-full h-[1px] bg-richblack-700'></div>
                </div>

                <button className='w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100
                border border-richblack-700 px-[12px] py-[12px] gap-x-2 mt-6'>
                    <FcGoogle/>
                    <p className='text-white'>Sign Up With Google </p>
                </button>
            </div>

            <div className='relative w-11/12 max-w-[450px]'>
                <img src={frameImage}
                alt="Pattern" width={300}
                height={200} loading="lazy"/>

                <img src={image}
                alt="Pattern" width={300}
                height={270} loading="lazy"
                    className='absolute -top-4 right-40'
                />   
            </div>

        </div>
    )
}

export default Template;
