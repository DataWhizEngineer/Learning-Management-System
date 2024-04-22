import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Colors from '../Utilis/Colors'

export default function EnrollmentSection({userEnrollment, onEnrollmentPress ,onContinuePress}) {

    // const [isenroll , setIsEnroll] = useState();
  return (
    <View style={{backgroundColor:Colors.PRIMARY , padding:15,borderRadius:10, marginTop:20}}>
      {userEnrollment?.length > 0?
      <TouchableOpacity onPress={()=> onContinuePress()}>
        <Text style={{textAlign:'center',fontFamily:'outfit-medium', fontSize:15,color:Colors.WHITE}}>Continue</Text>
        </TouchableOpacity>

      : <TouchableOpacity onPress={()=> onEnrollmentPress()}><Text style={{textAlign:'center',fontFamily:'outfit-medium', fontSize:15,color:Colors.WHITE}}>Enroll To Course</Text>
      </TouchableOpacity>}
      
    </View>
  )
}