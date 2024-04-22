import { request, gql } from 'graphql-request'

const MASTER_URL = "https://api-ap-south-1.hygraph.com/v2/clv3rc3nt2yws07wb164j9qj8/master";
const getCategory = async ()=> {
    const query = gql`
    query GetCategory {
        categories {
          id
          name
          icons {
            url
          }
          slug
        }
      }
      `

      const result = await request(MASTER_URL,query);
      return result;
}

const getCourseList =async () => {
const query = gql`query MyQuery {
  courseLists(first: 50, orderBy: createdAt_DESC) {
    author
    description
    demoUrl
    free
    id
    name
    slug
    sourceCode
    tag
    youtubeUrl
    banner {
      url
    }
    chapter(first: 50) {
      ... on Chapter {
        id
        name
        video {
          url
        }
      }
    }
  }
}

`
const result = await request(MASTER_URL,query);
return result;

}

const saveUserCourseEnrollment = async (slug , email)=> {
const query = gql `mutation MyMutation {
  createUserEnrollCourse(
    data: {courseId: "`+slug+`" , courseList: {connect: {slug:"`+slug+`"}}, userEmail: "`+email+`"}
  ) {
    id
  }
  publishManyUserEnrollCourses {
    count
  }
}
`
const result = await request(MASTER_URL,query);
return result;

}



const checkUserCourseEnrollment = async (slug , email) =>{
            const query = gql`
            query MyQuery {
              userEnrollCourses(where: {courseId: "`+slug+`" , userEmail: "`+email+`"}) {
                completedChapter {
                  ... on CompletedChapter {
                    id
                    chapterId
                  }
                }
                courseId
                id
              }
            }
            `
            const result = await request(MASTER_URL,query);
            return result;
          }
          

  const checkUserMembership = async(email)=> {
        const query = gql `query MyQuery {
          memberships(where: {email: "`+email+`" , active: true}) {
            createdAt
            email
            id
          }
        }
        `
        const result = await request(MASTER_URL,query);
        return result;
  }

  const createNewMembership = async(email)=> {
    const query = gql`
    mutation MyMutation {
      createMembership(data: {active: true, email: "`+email+`", paymentId: "1234"}) {
        id
      }
      publishManyMemberships {
        count
      }
    }
    `
    const result = await request(MASTER_URL,query);
    return result;
  }

  const markChapterCompleted =async (recordId , chapterId)=>{
       const query = gql`mutation MyMutation {
        updateUserEnrollCourse(
          data: {completedChapter: {create: {CompletedChapter: {data: {chapterId: "`+chapterId+`"}}}}}
          where: {id: "`+recordId+`"}
        ) {
          id
        }
        publishManyUserEnrollCourses {
          count
        }
      }
      
    `
    const result = await request(MASTER_URL,query);
    return result;
  }

  const getAllUserEnrollCourses = async (email)=> {
       const query = gql`
       query MyQuery {
        userEnrollCourses(where: {userEmail:"`+email+`"}) {
          completedChapter {
            ... on CompletedChapter {
              id    
              chapterId
            }
          }
          courseId
          courseList {
            author
            banner {
              url
            }
            chapter(first: 50){
              ... on Chapter {
                id
                name
                video {
                  url
                }
              }
            }
            demoUrl
            description
            free
            id
            name
            slug
            sourceCode
            tag
            totalChapters
          }
        }
      }
      `
      const result = await request(MASTER_URL,query);
       return result;
  }

export default {
    getCategory,
    getCourseList,
    checkUserCourseEnrollment,
    saveUserCourseEnrollment,
    checkUserMembership,
    createNewMembership,
    markChapterCompleted,
    getAllUserEnrollCourses,
}