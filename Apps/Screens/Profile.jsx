import { View, Text , Image, FlatList, TouchableOpacity, Linking, ToastAndroid} from 'react-native';
import React from 'react';
import { UserDetailsContext } from '../../App';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Utilis/Colors';
import { useNavigation } from '@react-navigation/native';
import { client } from '../Utilis/KindConfig';
import { useContext } from 'react';
import { Alert } from 'react-native';

export default function Profile() {

  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const navigation = useNavigation();

  const menu=[
    {
      id:1,
      name:"Explore",
      path:"Home",
      icon:"search"
    },
    {
      id:2,
      name:'My Course',
      path:'MyCourse',
      icon:'book'
    },
    {
      id:3,
      name:'Logout',
      icon:"power"
    },
    {
      id:4,
      name:'Contact Us',
      icon:'call',
      url:'nikamutkarsh355@gmail.com'
    }
  ]

  const onMenuClick =async(item)=> {
        if(item?.url){
          Alert.alert("Contact Us ", "Email :- nikamutkarsh355@gmail.com",  [
            {
              text: "ok",
              // onPress: () => console.log("Ok press"),
              style: "cancel",
            },
          ]);
        }
        else if(item.path){
          navigation.navigate(item.path)
        }
        else if(item.name=='Logout'){
          const loggedout = await client.logout();
          if(loggedout){
            navigation.navigate('login')
          }
        }

          
  }

  return (
    <View style={{padding:20,marginTop:20}}>
      <Text style={{fontFamily:'outfit-bold', fontSize:27}}>Profile</Text>

      {userDetails && <View style={{alignItems:'center',marginTop:20}}>

        <Image source={{uri:userDetails?.picture}} style={{width:100,height:100,borderRadius:99}}/>
        <Text style={{fontFamily:"outfit-bold", fontSize:26}}>{userDetails?.given_name}</Text>
        <Text style={{fontFamily:"outfit", fontSize:18}}>{userDetails?.email}</Text>
      </View>}

       <View style={{marginTop:75, marginLeft:20}}>
        <FlatList
        data={menu}
        renderItem={({item,index})=>(
      <TouchableOpacity  onPress={()=>onMenuClick(item)}
      style={{display:'flex',flexDirection:'row', gap:15,alignItems:'center', marginBottom:25,paddingHorizontal:5}}>
       <Ionicons name={item.icon} size={34} color={Colors.PRIMARY}/>  
       <Text style={{fontFamily:'outfit',fontSize:22}}>{item.name}</Text>
      </TouchableOpacity>
  )}
        
        />

       </View>

      </View>
  )
}