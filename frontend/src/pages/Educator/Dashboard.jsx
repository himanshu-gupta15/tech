import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaLongArrowAltLeft } from "react-icons/fa";
import {CartesianGrid, ResponsiveContainer, XAxis,Bar,BarChart,Tooltip,YAxis} from 'recharts'
import Course from '../../../../backend/model/courseModel';
const Dashboard = () => {
  const {userData}=useSelector(state=>state.user)
  const navigate=useNavigate()
  const {creatorCourseData}=useSelector(state=>state.course)

  const CourseProgressData=creatorCourseData?.map((course)=>({
    name:course.title?.slice(0,10)+"...",
    lectures:course.lectures?.length||0
  }))||[];

  const EnrollData=creatorCourseData?.map((course)=>({
    name:course.title?.slice(0,10)+"...",
    enrolled:course.enrollStudents?.length||0
  }))||[];

  const totalEarning=creatorCourseData?.reduce((sum,course)=>{
    const studentCount=Course.enrollStudents?.length ||0;
    const courseRevenue=course.price?course.price*studentCount:0
    return sum+courseRevenue
  },0) ||0
  return (
    <div className='flex min-h-screen bg-gray-100'>
      <FaLongArrowAltLeft className='absolute top-[10%] left-[10%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>
      <div className='w-full px-6 py-10 bg-gray-50 space-y-10'>
           {/* main section */}
           <div className='max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6'>
            <img src={userData?.photoUrl || userData?.name.slice(0,1).toUpperCase()} className='w-28 h-28 rounded-full object-cover border-4 border-black shadow-md' alt='Educator'/>

            <div className='text-center md:text-left space-y-1'>
              <h1 className='text-2xl font-bold text-gray-800'>Welcome, {userData?.name || "Educator"}👋</h1>
              <h1 className='text-xl font-semibold text-gray-800'>Total Earning :₹{totalEarning.toLocaleString()}</h1>
              <p className='text-gray-600 text-sm'>{userData?.description || "Start Creating Courses for Your Students"}</p>
              <h1 className='px-[10px] text-center py-[10px] border-2 bg-black border-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center cursor-pointer' onClick={()=>navigate("/courses")}>Create Courses</h1>
            </div>
           </div>
           {/* Graph section */}
           <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-lg font-semibold mb-4'>Course Progress (Lectures)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CourseProgressData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="lectures" fill="black" radius={[5,5,0,0]}/>
              </BarChart>

            </ResponsiveContainer>
           </div>


           {/* Enrolled data */}


           <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-lg font-semibold mb-4'>Students Enrollment</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={EnrollData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="enrolled" fill="black" radius={[5,5,0,0]}/>
              </BarChart>
 
            </ResponsiveContainer>
           </div>
      </div>
      
    </div>
  )
}

export default Dashboard
