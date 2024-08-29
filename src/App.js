import React,{useState} from "react";
// import data from "./Data";
// import Contents from "./components/Contents";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import {Route,Routes} from 'react-router-dom';
import PrivateRouter from './components/PrivateRouter';
import Navbar from './components/Navbar';
import About from './pages/About';
import Contact from './pages/Contact';
import MockTest from "./pages/MockTest";

function App() {

const [isLoggedIn,setIsLoggedIn]=useState(false);
 
  return (
    <div >

      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/about" element={<About setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/contact" element={<Contact setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/dashboard" element={
          <PrivateRouter isLoggedIn={isLoggedIn}> 
            <Dashboard/> 
          </PrivateRouter> }/>
          <Route path="/mock-test" element={<MockTest />} /> {/* Add this route for the mock test */}
      </Routes>
    </div>
  );
}

export default App;
