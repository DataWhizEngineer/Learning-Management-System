import { View, Text, FlatList, ViewComponent, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import Colors from '../Utilis/Colors';
import SectionHeading from './SectionHeading';

export default function CategoryList({categories , setSelectedCategory,isLoading, getCourseList}) {

  const [activeindex , setActiveIndex] = useState();
  

  return (
    <View style={{marginTop:25}}> 
    <SectionHeading heading={'Category'}/>
     <FlatList
          data={categories}
          refreshing={isLoading}
          onRefresh={()=>getCourseList()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item , index}) => (
            <TouchableOpacity style={[styles.container, activeindex==index && {borderWidth:1, borderColor:Colors.PRIMARY}]}
            onPress={()=> {setActiveIndex(index); setSelectedCategory(item.slug)}}>

              <Image source={{uri:item?.icons?.url}} style={{
                width:40,height:40,borderRadius:99
              }}/>
              <Text style={{textAlign:'center' , fontFamily:'outfit', marginTop:10}}>{item?.name}</Text>
              </TouchableOpacity>
          )}
     />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
        backgroundColor:Colors.WHITE,
        padding:15,
        marginRight:10,
        alignItems:'center',
        alignContent:'center',
        borderRadius:20,
        width:100,
        height:100
  }
})