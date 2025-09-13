import axios from 'axios'
import React,{useEffect} from 'react'
import { serverUrl } from '../App'
import { setreviewData } from '../redux/reviewSlice'
import { useDispatch } from 'react-redux'
const getAllReview = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    const allReviews=async()=>{
      try{
        const result=await axios.get(serverUrl+"/api/review/getreview",{withCredentials:true})
          dispatch(setreviewData(result.data))
          console.log(result.data)
      }catch(error){
       console.log(error)
      }
    }
    allReviews()
  },[])
  
}

export default getAllReview
