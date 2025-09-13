
import React, {useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Card from "./Card.jsx"

const CardPage = () => {
  const { courseData } = useSelector(state => state.course)
  const [popularCourses, setPopularCourses] = useState([])

  useEffect(() => {
    if (courseData && Array.isArray(courseData)) {
      setPopularCourses(courseData.slice(0,6))
    } else {
      setPopularCourses([])
    }
  }, [courseData])

  return (
    <div className='relative flex items-center justify-center flex-col'>
      <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]'>
        Our Popular Courses
      </h1>
      <span>
        Explore top-rated courses designed to boost your skills, enhance careers, 
        and unlock opportunities in tech, AI, business, and beyond.
      </span>
      <div className='w-[100%] min-h-[100vh] flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]'>
        {popularCourses?.map((course,index)=> (
          <Card
            key={index}
            thumbnail={course.thumbnail}
            title={course.title}
            category={course.category}
            price={course.price}
            id={course._id}
            reviews={course.reviews}
          />
        ))}
      </div>
    </div>
  )
}

export default CardPage
