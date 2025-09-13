import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import ForgetPassword from './pages/ForgetPassword.jsx'
import { Navigate } from 'react-router-dom'
export const serverUrl="https://tech-8nv0.onrender.com"
 import { ToastContainer } from 'react-toastify';
import getCurrentUser from './customHooks/getCurrentUser.js'

import { useSelector } from 'react-redux'
import EditProfile from './pages/EditProfile.jsx'
import Dashboard from './pages/Educator/Dashboard.jsx'

import Courses from './pages/Educator/Courses.jsx'
import CreateCourses from './pages/Educator/CreateCourses.jsx'
import getCreatorCourse from './customHooks/getCreatorCourse.js'
import EditCourse from './pages/Educator/EditCourse.jsx'
import getPublished from './customHooks/getPublished.js'
import AllCourses from './pages/AllCourses.jsx'
import CreateLecture from './pages/Educator/CreateLecture.jsx'
import EditLecture from './pages/Educator/EditLecture.jsx'
import ViewCourse from './pages/ViewCourse.jsx'
import ScrollToTop from './component/ScrollToTop.jsx'
import ViewLectures from './pages/ViewLecture.jsx'
import MyEnrolledCourses from './pages/MyEnrolledCourses.jsx'
import getAllReview from './customHooks/getAllReview.js'
import SearchWithAi from './pages/SearchWithAi.jsx'
const App = () => {
  getCurrentUser()
  getCreatorCourse()
  getPublished()
  getAllReview()

  const {userData}=useSelector(state=>state.user)
  return (
    <>
    <ToastContainer />
    <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={!userData?<SignUp/>:
       <Navigate to={"/"}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={userData?<Profile/>:<Navigate to={"/signup"}/>}/>

         <Route path='/forget' element={userData?<ForgetPassword />:<Navigate to={"/signup"}/>}/> 
          <Route path='/editprofile' element={userData?<EditProfile />:<Navigate to={"/signup"}/>}/> 

          <Route path='/allcourses' element={userData?<AllCourses />:<Navigate to={"/signup"}/>}/>
          <Route path='/dashboard' element={userData?.role==="educator"?<Dashboard/>:<Navigate to={"/signup"}/>}/> 
          <Route path='/Courses' element={userData?.role==="educator" ? <Courses/>:<Navigate to={"/signup"} />}/>

          <Route path='/createcourse' element={userData?.role==="educator" ? <CreateCourses/>:<Navigate to={"/signup"} />}/> 
          <Route path='/editcourse/:courseId' element={userData?.role==="educator" ? <EditCourse/>:<Navigate to={"/signup"} />}/>

           <Route path='/createlecture/:courseId' element={userData?.role==="educator" ? <CreateLecture/>:<Navigate to={"/signup"} />}/>
            <Route path='/editlecture/:courseId/:lectureId' element={userData?.role==="educator" ? <EditLecture/>:<Navigate to={"/signup"} />}/>
             <Route path='/viewcourse/:courseId' element={userData? <ViewCourse/>:<Navigate to={"/signup"} />}/>
             <Route path='/viewlecture/:courseId' element={userData? <ViewLectures/>:<Navigate to={"/signup"} />}/>
            <Route path='/mycourses' element={userData? <MyEnrolledCourses/>:<Navigate to={"/signup"} />}/>

             <Route path='/search' element={userData? <SearchWithAi/>:<Navigate to={"/signup"} />}/>
      </Routes>
    </>
  )
}

export default App
