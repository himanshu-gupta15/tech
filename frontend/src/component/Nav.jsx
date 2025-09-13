import React, { useState } from 'react'
import logo from "../assets/logo.jpg"
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { GiSplitCross, GiHamburgerMenu } from "react-icons/gi";


const Nav = () => {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [showHam, setShowHam] = useState(false)

  const handleLogOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      dispatch(setUserData(null))
      console.log(result.data)
      toast.success("LogOut Successfully")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Logout failed")
    }
  }

  return (
    <div>
      <div className="w-full h-[70px] fixed top-0 left-0 px-6 flex items-center justify-between bg-black/60 backdrop-blur-lg shadow-lg z-20">
        
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="logo" 
            className="w-[55px] rounded-md border-2 border-white shadow-md hover:scale-105 transition"
          />
        </div>

        {/* Right Menu */}
        <div className="hidden lg:flex items-center gap-5">
          {!userData && (
            <IoPersonCircle 
              className="w-[45px] h-[45px] text-white cursor-pointer hover:scale-110 transition"  
              onClick={() => setShow(prev => !prev)} 
            />
          )}

          {userData?.photoUrl?<img src={userData?.photoUrl} className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer hover:scale-105 transition" onClick={() => setShow(prev => !prev)}/>: 
            <div 
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer hover:scale-105 transition"
              onClick={() => setShow(prev => !prev)}
            >
              {userData?.name.slice(0,1).toUpperCase()}
            </div>
          }

          {userData?.role === "educator" && (
            <div className="px-5 py-2 border-2 border-white text-white rounded-lg text-lg font-medium cursor-pointer bg-black/70 hover:bg-black/90 transition" onClick={()=>navigate("/dashboard")}>
              Dashboard
            </div>
          )}

          {!userData ? (
            <span 
              className="px-5 py-2 border-2 border-white text-white rounded-lg text-lg font-medium cursor-pointer bg-black/70 hover:bg-black/90 transition"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          ) : (
            <span 
              className="px-5 py-2 bg-white text-black rounded-lg shadow-md text-lg font-semibold cursor-pointer hover:bg-gray-200 transition"
              onClick={handleLogOut}
            >
              LogOut
            </span>
          )}

          {/* Dropdown */}
          {show && (
           <div className="absolute top-[95%] right-[7%] flex flex-col items-center gap-1 text-[16px] rounded-md bg-white px-3 py-2 border-2 border-black shadow-lg">
  <span className="w-full text-center bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition" onClick={()=>navigate("/profile")}>My Profile</span>
  <span className="w-full text-center bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition" onClick={()=>navigate("/mycourses")}>My Courses</span>
</div>

          )}
        </div>

        {/* Hamburger for Mobile */}
       <GiHamburgerMenu className='w-[35px] h-[40px] lg:hidden text-white cursor-black cursor-pointer' onClick={()=>setShowHam(prev=>!prev)}/>

        {/* Mobile Sidebar */}
        <div className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000e8] flex items-center justify-center flex-col gap-5 z-30 transform ${showHam ? "translate-x-0" : "-translate-x-full"} transition-transform duration-500`}>
          <GiSplitCross 
            className="w-[35px] h-[35px] text-white absolute top-6 right-6 cursor-pointer hover:rotate-90 transition"
            onClick={() => setShowHam(false)} 
          />
           {!userData && (
            <IoPersonCircle 
              className="w-[45px] h-[45px] text-white cursor-pointer hover:scale-110 transition"  
              
            />
          )}

          {userData?.photoUrl?<img src={userData?.photoUrl} className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer hover:scale-105 transition" onClick={() => setShow(prev => !prev)}/>:
            <div 
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer hover:scale-105 transition"
             
            >
              {userData?.name.slice(0,1).toUpperCase()}
            </div>
          }
          <div className=" w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white rounded-lg text-lg font-medium cursor-pointer bg-black/70 hover:bg-black/90 transition"onClick={()=>navigate("/profile")}>
              My Profile
            </div>
            <div className=" w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white rounded-lg text-lg font-medium cursor-pointer bg-black/70 hover:bg-black/90 transition"onClick={()=>navigate("/mycourses")} >
              My Courses
            </div>
          {userData?.role === "educator" && (
            <div className="w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white rounded-lg text-lg font-medium cursor-pointer bg-black/70 hover:bg-black/90 transition" onClick={()=>navigate("/dashboard")}>
              Dashboard
            </div>
          )}
          {!userData ? (
            <span 
              className=" w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white rounded-lg text-lg font-medium cursor-pointer bg-black/70 hover:bg-black/90 transition"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          ) : (
            <span 
              className=" w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white rounded-lg text-lg font-medium cursor-pointer bg-black/70 hover:bg-black/90 transition"
              onClick={handleLogOut}
            >
              LogOut
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Nav
