// import React from 'react';
// import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';
// import ExamCreation from './ExamCreation';
// //import StudentPerformance from './StudentPerformance';

// const AdminDashboard = () => {
//     let { path, url } = useRouteMatch();

//     return (
//         <div>
//             <nav>
//                 <Link to={`${url}/create-exam`}>Create Exam</Link>
//                 <Link to={`${url}/student-performance`}>Student Performance</Link>
//             </nav>

//             <Switch>
//                 <Route exact path={path}>
//                     <h3>Select an option from the dashboard</h3>
//                 </Route>
//                 <Route path={`${path}/create-exam`} component={ExamCreation} />
//                 <Route path={`${path}/student-performance`} component={StudentPerformance} />
//             </Switch>
//         </div>
//     );
// };

// export default AdminDashboard;
