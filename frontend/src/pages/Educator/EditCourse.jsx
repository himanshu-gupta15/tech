import React, { useState,useRef, useEffect } from 'react'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import img from "../../assets/empty.jpg"
import { serverUrl } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '../../redux/courseSlice';

const EditCourse = () => {
  const navigate=useNavigate()
  const {courseId}=useParams()
  console.log(courseId)
  
  const [isPublished,setIsPublished]=useState(false)
  const thumb = useRef(null)  

  const [selectCourse,setSelectCourse]=useState(null)
  const [title,setTitle]=useState("")
  const [subtitle,setSubTitle]=useState("")
  const [description,setDesciption]=useState("")
  const [category,setCategory]=useState("")
  const [level,setLevel]=useState("")
  const [price,setPrice]=useState("")
  const [frontedImage,setFrontendImage]=useState(img)
  const [backendImage,setBackendImage]=useState("")
  const [loading,setLoading]=useState(false)
  const [loading1,setLoading1]=useState(false)
   const dispatch=useDispatch()
   const {courseData}=useSelector(state=>state.course)

 const handleThumbnail = (e) => {
  const file = e.target.files[0];
  console.log("Selected file:", file); // ✅ debug
  if (file) {
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  }
};


  const getCourseById=async ()=>{
    try{
      //  const result=await axios.get(serverUrl+`/api/course/getcourse/${courseId}`,{withCredintials:true})

      const result = await axios.get(
        `${serverUrl}/api/course/getcourse/${courseId}`, 
        { withCredentials: true }   // ✅ fixed typo
      )
       setSelectCourse(result.data)
       console.log(result.data)
    }catch(error){
       console.log(error)
    }
  }
 

  useEffect(()=>{
    if(selectCourse){
      setTitle(selectCourse.title||"")
      setSubTitle(selectCourse.subTitle||"")
      setDesciption(selectCourse.description||"")
      setCategory(selectCourse.category||"")
      setLevel(selectCourse.level||"")
      setPrice(selectCourse.price||"")
      setFrontendImage(selectCourse.thumbnail|| img)
      setIsPublished(selectCourse?.isPublished)
    }
  },[selectCourse])
  useEffect(()=>{
    getCourseById()
  },[])

  const handleEditCourse=async()=>{
    setLoading(true)
      const formData=new FormData()
      formData.append("title",title)
      formData.append("subTitle",subtitle)
      formData.append("description",description)
      formData.append("category",category)
      formData.append("level",level)
      formData.append("price",price)
      formData.append("thumbnail",backendImage)
      formData.append("isPublished",isPublished)
      try{
        const result=await axios.post(serverUrl+`/api/course/editcourse/${courseId}`,formData,{withCredentials:true})

        const updateData=result.data
        if(updateData.isPublished){
          const updateCourses=courseData.map(c=>c._id ===courseId ? updateData:c)
          if(!courseData.some(c=>c._id===courseId))
          {
            updateCourses.push(updateData)
          }
          dispatch(setCourseData(updateCourses))
        }else{
               const filterCourses=courseData.filter(c=>c._id!==courseId)
               dispatch(setCourseData(filterCourses))
        }
        setLoading(false)
        navigate("/courses")
        toast.success("Course Updated")
    }catch(error){
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }



  const  handleRemoveCourse=async()=>{ 
    setLoading(true)
    try{ 
       const result=await axios.delete(serverUrl+`/api/course/remove/${courseId}`,{withCredentials:true})
       console.log(result.data)
       const filterCourses=courseData.filter(c=>c._id!==courseId)
       dispatch(setCourseData(filterCourses))
       setLoading1(false)
       toast.success("Course Removed")
       navigate("/courses")

    }catch(error){
      console.log(error)
         setLoading1(false)
       toast.error(error.response.data.message)
    }
  }
  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md'>
      {/* top bar */}
      <div className='flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative'>
        < FaLongArrowAltLeft className='top-[-20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/courses")}/>
        <h2 className='text-2xl font-semibold md:pl-[60px]'>Add Detail Information regarding the Course</h2>
        <div className='space-x-2 space-y-2'>
          <button className='bg-black text-white px-4 py-2 rounded-md' onClick={()=>navigate(`/createlecture/${selectCourse?._id}`)}>Go to Lecture Page</button>
        </div>
      </div>
      {/* form details */}
      <div className='bg-gray-50 p-6 rounded-md'>
        <h2 className='text-lg font-medium mb-4'>Basic Course Information</h2>
          <div className='space-x-2 space-y-2'>
         {!isPublished?   <button className='bg-green-100 text-green-600  px-4 py-2 rounded-md border-1'onClick={()=>setIsPublished(prev=>!prev)}>Click to Publish</button>: <button className='bg-red-100 text-red-600 px-4 py-2 rounded-md border-1' onClick={()=>setIsPublished(prev=>!prev)}>Click to UnPublish</button>}
            <button className='bg-red-600 text-white px-4 py-2 rounded-md' onClick={handleRemoveCourse}>Remove Course</button>
          </div>
         <form action="" onSubmit={(e)=>e.preventDefault()}>
          <div>
            <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>Title

            </label>
            <input id='title' type='text' className='w-full border px-4 py-2 rounded-md' placeholder='CourseTitle' onChange={(e)=>setTitle(e.target.value)} value={title}/>
          </div>
          <div>
            <label htmlFor='subtitle' className='block text-sm font-medium text-gray-700 mb-1'>Subtitle</label>
            <input id='subtitle' type='text' className='w-full border px-4 py-2 rounded-md' placeholder='Course Subtitle' onChange={(e)=>setSubTitle(e.target.value)} value={subtitle}/>
          </div>
           <div>
            <label htmlFor='des' className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
            <textarea id='des' type='text' className='w-full border px-4 py-2 rounded-md resize-none' placeholder='Course Description' onChange={(e)=>setDesciption(e.target.value) } value={description}></textarea>
          </div>
          <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
            {/* for category */}
            <div className='flex-1'>
              <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Category</label>
              <select name="" id="" className='w-full border px-4 py-2 rounded-md bg-white' onChange={(e)=>setCategory(e.target.value)} value={category}>
                 <option value=''>{category}</option>
              <option value="App Development">App Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="UI UX Designing">UI UX Designing</option>
              <option value="Web Development">Web Development</option>
              <option value="Others">Others</option>
              </select>
            </div>
            {/* for level */}
            <div className='flex-1'>
              <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Level</label>
              <select name="" id="" className='w-full border px-4 py-2 rounded-md bg-white' onChange={(e)=>setLevel(e.target.value)} value={level}>
                 <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              
              </select>
            </div>
            {/* for price */}
             <div className='flex-1'>
              <label htmlFor="price" className='block text-sm font-medium text-gray-700 mb-1'>Course Price (INR)</label>
              <input type='number' name='' id='price'className='w-full border px-4 py-2 rounded-md' placeholder='₹'onChange={(e)=>setPrice(e.target.value)} value={price}/>
            </div>
           
          
          </div>
         <div>
  <label className='block text-sm font-medium text-gray-700 mb-1'>
    Course Thumbnail
  </label>
  <input
    type='file'
    hidden
    ref={thumb}
    accept='image/*'
    onChange={handleThumbnail}
  />
</div>

<div className='relative w-[300px] h-[170px]'>
  <img
    src={frontedImage}
    alt=''
    className='w-full h-full border border-black rounded-[5px]'
    onClick={() => thumb.current && thumb.current.click()}
  />
  <FaEdit
    className='w-[20px] h-[20px] absolute top-2 right-2 cursor-pointer'
    onClick={() => thumb.current && thumb.current.click()}
  />
</div>

            <div className='flex items-center justify-start gap-[15px]'>
              <button className='bg-[#e9e8e8] hover:bg-red-200 text-black border-1 border-black cursor-pointer px-4 py-2 rounded-md' onClick={()=>navigate("/courses")}>
                
                Cancel
              </button>
              <button className='bg-black text-white px-7 py-2 rounded-md hover:gb-gray-500 cursor-pointer' onClick={handleEditCourse}>{ loading?<ClipLoader size={30} color='white'/>:"Save"}</button>
            </div>
         </form>
      </div>
    </div>
  )
}

export default EditCourse
