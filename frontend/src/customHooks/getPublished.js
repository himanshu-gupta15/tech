import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { setCourseData } from '../redux/courseSlice.js'
import { useDispatch } from 'react-redux'
const getPublished = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
       const getCourseData=async()=>{
      try{
         const result=await axios.get(serverUrl+"/api/course/getpublished",{withCredentials:true})
         dispatch(setCourseData(result.data))
         console.log(result.data)
      }catch(error){
        console.log(error)
      }
    }
    getCourseData()
    },[dispatch])
   
  
}

export default getPublished
