import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCreatorCourseData } from '../redux/courseSlice.js'
const getCreatorCourse=()=>{
  const dispatch=useDispatch()
  const {userData}=useSelector(state=>state.user)
   return (
    useEffect(()=>{
      const creatorCourses=async()=>{
        try{
             const result=await axios.get(serverUrl+"/api/course/getcreator",{ withCredentials:true})
             console.log(result.data)
             dispatch(setCreatorCourseData(result.data))
        }catch(error){
              console.error(error)
        }
      }
      creatorCourses()
    },[userData])
  )
}

export default getCreatorCourse