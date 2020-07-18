// import React from 'react';
// import {useStoreContext} from '../utils/GlobalState';
// import {Switch, Redirect, Router, Route} from 'react-router-dom';
// import Goals from '../pages/Goals';
// import StockMarket from '../pages/StockMarket';
// import Dashboard from '../pages/Dashboard';
// import {createBrowserHistory} from 'history';

// const ProtectedRoutes = () => {
//   const [state] = useStoreContext();
//   const history = createBrowserHistory();

//   // function listProtectedRoutes() {
//   //     return (
//   //         <>
//   //         <Route exact path='/' component={Dashboard} />
//   //         <Route exact path='/goals' component={Goals} />
//   //         <Route exact path='/stock-market' component={StockMarket} />
//   //         </>
//   //     )
//   // }

//   if (state.user.length === 0) {
//     return <Redirect to="/login" />;
//   }

//   return (
//         // <Router history={history}>
//         //     <div>
//         //     <Switch>
//         <>
//                 <Route exact path='/' component={Dashboard} />
//                 <Route exact path='/goals' component={Goals} />
//                 <Route exact path='/stock-market' component={StockMarket} />
//         </>
//         //     </Switch>
//         //     </div>
//         // </Router>
//   );
// };

// export default ProtectedRoutes;
