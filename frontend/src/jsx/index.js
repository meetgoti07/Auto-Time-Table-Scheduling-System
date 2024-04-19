import React, { useContext } from 'react'
/// React router dom
import {Routes, Route, Outlet } from 'react-router-dom'
import {  useSelector } from "react-redux";
/// Css
import './index.css'


/// Layout
import Nav from './layouts/nav'
import Footer from './layouts/Footer'
import { ThemeContext } from "../context/ThemeContext";

/// Dashboard
import Home from "./components/Dashboard/Home";


/// Pages

import LockScreen from './pages/LockScreen'
import Error400 from './pages/Error400'
import Error403 from './pages/Error403'
import Error404 from './pages/Error404'
import Error500 from './pages/Error500'
import Error503 from './pages/Error503'


//Scroll To Top
import ScrollToTop from './layouts/ScrollToTop';
import DashboardDark from './components/Dashboard/Admin';


const Markup = () => {
  // let path = window.location.pathname
  // path = path.split('/')
  // path = path[path.length - 1]
  // let pagePath = path.split('-').includes('page')
  

  const allroutes = [
    /// Dashboard
    { url: '', component: <Home/> },
    { url: 'dashboard', component: <Home/> },
    { url: 'timetable', component: <DashboardDark/> },
  ]

  return (
       <>          
          <Routes>              
            <Route path='/page-lock-screen' element= {<LockScreen />} />
            <Route path='/page-error-400' element={<Error400/>} />            
            <Route path='/page-error-403' element={<Error403/>} />
            <Route path='/page-error-404' element={<Error404/>} />
            <Route path='/page-error-500' element={<Error500/>} />
            <Route path='/page-error-503' element={<Error503/>} />     
            <Route  element={<MainLayout />} > 
                {allroutes.map((data, i) => (
                  <Route
                    key={i}
                    exact
                    path={`${data.url}`}
                    element={data.component}
                  />
                  ))}
            </Route>                            
         </Routes> 
         <ScrollToTop />
       </>
  )
}

function MainLayout(){
  const {sidebariconHover} = useContext(ThemeContext);
  const sideMenu = useSelector(state => state.sideMenu);
  return (
    <>    
      <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle": ""} ${ sideMenu ? "menu-toggle"  : ""}`}>  
          <Nav />
          <div className="content-body" style={{ minHeight: window.screen.height - 60 }}>     
            <div className="container-fluid">
              <Outlet />   
            </div>
          </div>
        <Footer />
      </div>
     
    </>
  )
};


export default Markup