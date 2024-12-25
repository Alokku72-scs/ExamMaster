import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthRoutes from './routes/AuthRoutes';
import AdminRoutes from './routes/AdminRoutes';
import StudentRoutes from './routes/StudentRoutes';
import PublicRoutes from './routes/PublicRoutes';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  const noNavbarRoutes = ['/paper', '/result-page','/final-page'];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  const setUser = (data) => {
    setIsLoggedIn(true);
    setUserRole(data.role);
  };

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && (
        <Navbar
          isLoggedIn={isLoggedIn}
          userRole={userRole}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        <Route path="/auth/*" element={<AuthRoutes isLoggedIn={isLoggedIn} setUser={setUser} />} />
        <Route path="/admin/*" element={<AdminRoutes isLoggedIn={isLoggedIn} userRole={userRole} />} />
        <Route path="/student/*" element={<StudentRoutes  isLoggedIn={isLoggedIn} userRole={userRole}/>} />
        <Route path="/*" element={<PublicRoutes setUser={setUser} />} /> 
      </Routes>
    </>
  );
}

export default App;



















// import React, { useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import PrivateRouter from './components/PrivateRouter';
// import PrivateRouterDemo from './components/PrivateRouterDemo';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import MockTest from './pages/MockTest';
// import AdminDashboard from './pages/AdminDashboard';
// import StudentDashboard from './pages/StudentDashboard';
// import Abc from "./pages/Abc";
// import Instruction from "./pages/Instruction";
// import Papper from './components/Papper';
// import Results from './pages/Results';
// import LoginFormDemo from './components/LoginFormDemo';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUserRole(null);
//   };

//   return (
//     <div>
//       <Navbar
//         isLoggedIn={isLoggedIn}
//         userRole={userRole}
//         onLogout={handleLogout}
//       />

//       <Routes>

//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login setUser={(data) => { setIsLoggedIn(true); setUserRole(data.role); }} />} />
//         <Route path="/signup" element={<Signup setUser={(data) => { setIsLoggedIn(true); setUserRole(data.role); }} />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/quiz" element={<MockTest />} />
//         <Route path="/demologin" element={<LoginFormDemo />} />
//         <Route path="/paper" element={<Papper/>} />
//         <Route path="/result-page" element={<Results/>} />

//         <Route path="/student-dashboard" element={
//           <PrivateRouter isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['student']}>
//             <StudentDashboard />
//           </PrivateRouter>
//         } />

//         <Route path="/admin-dashboard" element={
//           <PrivateRouter isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}>
//             <AdminDashboard />
//           </PrivateRouter>
//         } />
//         <Route path="/instruction" element={
//           <PrivateRouter isLoggedIn={isLoggedIn} userRole={userRole} allowedRoles={['admin']}>
//             <Instruction />
//           </PrivateRouter>
//         } />
//       </Routes>
//     </div>
//   );
// }

// export default App;
