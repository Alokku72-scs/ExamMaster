import React,{useState} from "react";
import data from "./Data";
import Contents from "./components/Contents";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import {Route,Routes} from 'react-router-dom';
import PrivateRouter from './components/PrivateRouter';
import Navbar from './components/Navbar';

function App() {

const [isLoggedIn,setIsLoggedIn]=useState(false);
 
  return (
    <div >

      <Navbar/>

      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/dashbord" element={
          <PrivateRouter> 
            <Dashboard/> 
          </PrivateRouter> }/>

      </Routes>

      {/* <Contents dataContainer={data}/> */}
    </div>
  );
}

export default App;
