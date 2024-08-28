import React from 'react';
import {useState} from 'react';
import toast from 'react-hot-toast';
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai';
import {Link,useNavigate} from 'react-router-dom';


const LoginForm =({setIsLoggedIn})=>{
    const [formData,setFormData]= useState({email:"",password:""});
    const [showPassword,setShowPassword] = useState(false);
    const navigate=useNavigate();

    function changeHanler(event){
        setFormData((prevData)=>(
        {
            ...prevData,
            [event.target.name] : event.target.value
        }
    ))
    }

    function submitHandler(event){
        event.preventDefault();
        setIsLoggedIn(true);
        toast.success("Logged In");
        navigate("/dashbord");
    }

    return (
        <form onSubmit={submitHandler}
        className='flex flex-col w-full  gap-y-4 mt-6'>
            <label>
                <p>
                    Email Address<sup className='text-pink-200'> *</sup>
                </p>
                <input
                required
                type="text"
                value={formData.email}
                onChange={changeHanler}
                placeholder='Enter email id'
                name='email'
                className='bg-richblack-800 rounded-[0.5rem] text-white w-full p-[12px]'
                />
            </label>

            <label>
                <p>
                    Password<sub className='text-pink-200'>*</sub>
                </p>

                <input
                required
                type={showPassword ? ("text"):("password")}
                value={formData.password}
                onChange={changeHanler}
                placeholder='Enter Password'
                name='password'
                className='bg-richblack-800 rounded-[0.5rem] text-white w-full p-[12px]'
                />

                <span className='absolute right-3 top-[38px] cursor-pointer'
                    onClick={()=>setShowPassword(prev=>!prev)}>
                        {showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                </span>
                <Link to='#'>
                    <p className='text-xs mt-1 text-blue-500 max-w-max ml-auto'>
                        Forgot Password
                    </p>
                </Link>
            </label>
            <button className='bg-yellow-500 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                Sign in
            </button>
        </form>
    )

}

export default LoginForm;