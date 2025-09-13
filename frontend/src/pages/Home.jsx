import React from 'react'
import home from '../assets/home.jpg'
import Nav from '../component/Nav'
import ai from '../assets/ai.png'
import ai1 from '../assets/searchAi.png'
import { SiViaplay } from "react-icons/si";

import Logos from '../component/Logos'
import ExploreCourses from '../component/ExploreCourses'
import CardPage from '../component/CardPage'
import { useNavigate } from 'react-router-dom'
import About from '../component/About'
import Footer from '../component/Footer'
import ReviewPage from '../component/ReviewPage'
const Home = () => {
  const navigate=useNavigate()
  return (
    <div className='w-[100%] overflow-hidden'>
      <div className='w-[100%] lg:h-[100vh] h-[70vh] relative'>
        <Nav/>
        <img src={home} className='w-full h-[50vh] lg:h-[100vh] object-cover' alt=''/>

        <span className='lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]'>Grow Your Skills to Advance</span>
        <span className='lg:text-[70px] text-[20px] md:text-[40px] absolute lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold'>Your Career path</span>
        <div className='absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center gap-3 flex-wrap'>
          <button className='px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer' onClick={()=>navigate("/allcourses")}>View All Courses <SiViaplay className='w-[30px] h-[30px] lg:fill-white fill-black' /></button>
           <button className='px-[20px] py-[10px] lg:bg-white bg-black lg:text-black text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center' onClick={()=>navigate("/search")}>Search With Ai <img src={ai} className='w-[30px] h-[30px] rounded-full hidden lg:block' alt=''/> <img src={ai1} className='w-[35px] h-[35px] rounded-full lg:hidden' alt=''/></button>
          
        </div>
         {/* <Logos/> */}
      </div>
       <Logos/>
       <ExploreCourses/>
       <CardPage/>
       <ReviewPage/>
       <About/>
       <Footer/>
    </div>
  )
}

export default Home
