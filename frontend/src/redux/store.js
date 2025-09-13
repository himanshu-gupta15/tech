import { configureStore } from "@reduxjs/toolkit";  
import courseSlice from './courseSlice'
import userSlice from "./userSlice"
import lectureSlice from "./lectureSlice"
import reviewSlice from "./reviewSlice"
export const store=configureStore({
  reducer:{
    user:userSlice,
    course:courseSlice,
    lecture:lectureSlice,
    review:reviewSlice
  }
})

