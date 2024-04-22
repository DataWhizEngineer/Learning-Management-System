import { View, Text, Button, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { client } from '../Utilis/KindConfig';
import { AuthContext } from '../../App';
import Header from '../Components/Header';
import GlobalApi from '../Utilis/GlobalApi';
import CategoryList from '../Components/CategoryList';
import SectionHeading from '../Components/SectionHeading';
import CourseList from '../Components/CourseList';
import CourseItemVertical from '../Components/CourseItemVertical';


export default function HomePage() {
   const {auth , setAuth} = useContext(AuthContext)
   const [categories , setCategories] = useState();
   const [courseList , setCourseList] = useState([]);
   const [orgCourseList , setOrgCourseList] = useState([]);
   const [isLoading , setIsLoading]= useState(false)

   
   
  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
        // User was logged out
        setAuth(false)
    }
  };

  useEffect(()=>{
    getCategory();
    getCourseList();
    filterCourseList();

  },[ ])
       
  const getCategory =() => {
        setIsLoading(true)
        GlobalApi.getCategory().then(resp => {
          setCategories(resp.categories);
          // console.log(categories)
          setIsLoading(false)
          
        })
  }


  
  const getCourseList =() => {
    GlobalApi.getCourseList().then(resp => {
     setCourseList(resp?.courseLists);
     //console.log(resp.courseLists)
     setOrgCourseList(resp?.courseLists)
      
    })
}

    const getFilterCourseList =(tag) => {
     const result = courseList.filter((item)=>item.tag.includes(tag));
     return result;
     }
  

//   const filterCourseList = (category) => {
//     const result = courseList.filter((item)=>item.tag.includes(category)) 
//     setCourseList(result)
// }

const filterCourseList = (category) => {
  // Handle the "include all" case efficiently
  if (category === 'all') {
    setCourseList(orgCourseList) // Return the original course list
  }

  // Efficiently filter courses based on tags (case-insensitive)
  const filteredCourses = courseList.filter((item)=>item.tag.includes(category)) 
  setCourseList(filteredCourses)
};

const handleSearch = (filteredCourses) => {
  // Update the course list in the parent component with the filtered results
  setCourseList(filteredCourses);
};

  return (
    <ScrollView  style={{padding:20,marginTop:25}}>
    <Header orgCourseList={orgCourseList} onSearch={handleSearch}/>
    <CategoryList categories={categories} isLoading={isLoading} getCourseList={()=>getCourseList()}
    setSelectedCategory={(category)=> filterCourseList(category)} />
    <SectionHeading heading={"Latest Courses"}/>
    <CourseList courseList={courseList}/>
     <SectionHeading heading={"Email-Marketing Courses"}/>
    <CourseList courseList={getFilterCourseList('email_marketing')}/> 
    <SectionHeading heading={"Popular Courses"}/>
    <CourseItemVertical courseList={courseList}/>
    </ScrollView>
  )
}