import express from 'express'
import { createCourse, createLecture,getCourseById, editCourse, editLecture, getCreatorById, getCourseLecture, getCreatorCourses, getPublishedCourses, removeCourse, removeLecture } from '../controller/courseController.js'
import upload from '../middleware/multer.js'
import isAuth from '../middleware/isAuth.js'
import { searchWithAi } from '../controller/seachController.js'
const courseRouter=express.Router()

courseRouter.post("/create",isAuth,createCourse)
courseRouter.get("/getpublished",getPublishedCourses)
courseRouter.get("/getcreator",isAuth,getCreatorCourses)
courseRouter.post("/editcourse/:courseId",isAuth,upload.single("thumbnail"),editCourse)

courseRouter.get("/getcourse/:courseId",isAuth,getCourseById)
courseRouter.delete("/remove/:courseId",isAuth,removeCourse)

// for Lectures
courseRouter.post("/createlecture/:courseId",isAuth,createLecture)
courseRouter.get("/courselecture/:courseId",isAuth,getCourseLecture)

courseRouter.post("/editlecture/:lectureId",isAuth,upload.single("videoUrl"),editLecture)
courseRouter.delete("/Removelecture/:lectureId",isAuth,removeLecture)
courseRouter.post("/creator",isAuth,getCreatorById)


// for search 
courseRouter.post("/search",searchWithAi)
export default courseRouter