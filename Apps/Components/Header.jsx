import { View, Text, Image, TextInput , StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { client } from '../Utilis/KindConfig'
import Colors from '../Utilis/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function Header({orgCourseList , onSearch }) {

    const [userDetail , setUserDetail] = useState();
    const [searchText, setSearchText] = useState(''); // State for search text
    useEffect(() => {
      
        getuserDetails();
        handleSearch();
        console.log(orgCourseList)
      }, [])
    
    const getuserDetails =async ()=> {
         const user = await client.getUserDetails();
         setUserDetail(user)
    }

    const handleSearch = async () => { // Define handleSearch function within Header
        if (searchText) {
          // Implement logic to filter courses based on search text within orgCourseList
          const filteredCourses = orgCourseList.filter((course) =>
            course.name.toLowerCase().includes(searchText.toLowerCase()) || // Filter by title
            course.description.toLowerCase().includes(searchText.toLowerCase()) // Or description (if available)
          );
    
          // Assuming onSearch prop is a function, call it with filtered courses
          if (onSearch) {
            onSearch(filteredCourses); // Pass filtered courses to parent component
          } else {
            console.warn('onSearch prop is not a function in Header component');
          }
    
          // Clear search text after handling
          setSearchText('');
        }
      };
    
  return (
    <>
    <View style={{display:'flex',flexDirection:'row',gap:5 , alignItems:'center'}}>
     <Image source={{uri:userDetail?.picture}} style={{width:45,height:45 ,borderRadius:99}}/>

     <View>
        <Text style={{fontSize:18 , fontFamily:'outfit'}}>Welcome,</Text>
        <Text style={{fontSize:20,fontFamily:'outfit-bold',color:Colors.PRIMARY}}>Hello {userDetail?.given_name}</Text>
    </View>

    </View>
    <View style={styles.input}>
    <Ionicons style={{marginLeft:-10}}name="search-circle-outline" size={25} color={Colors.GRAY}/>
    <TextInput
          placeholder='Search'
          style={{ fontFamily: 'outfit', width: '100%' }}
          value={searchText} // Bind searchText state to TextInput
          onChangeText={setSearchText} // Update searchText state on input change
          onSubmitEditing={handleSearch} // Trigger search on submit (pressing Enter)
        />
    </View>
    </>

    )
}

const styles = StyleSheet.create({
    input:{
        backgroundColor:Colors.WHITE,
        padding:10,
        borderRadius:99,
        paddingHorizontal:20,
        marginTop:20,
        display:'flex',
        flexDirection:'row',
        gap:20,
        alignItems:'center',
        borderWidth:0.5,
        borderColor:Colors.PRIMARY
        

    }
})