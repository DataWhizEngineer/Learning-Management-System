import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Colors from "../Utilis/Colors";
import { StyleSheet } from "react-native";
import { client } from "../Utilis/KindConfig";
import { AuthContext } from "../../App";



export default function Login() {
  
    const {auth ,setAuth} = useContext(AuthContext)
          
    const handleSignUp = async () => {
        const token = await client.register();
        if (token) {
          // User was authenticated
          setAuth(true);
        }
      };
      
      const handleSignIn = async () => {
        const token = await client.login();
        if (token) {
          // User was authenticated
          setAuth(true);

        }
      };

  return (
    <View>
      <Image
        style={{ width: "100%", height: 400, objectFit: "cover"  , borderRadius:15}}
        source={require("./../../assets/images/rocket.jpg")}
      />

      <View style={{padding:20}} >
        <Text style={{fontSize:45 ,fontWeight:'bold',display:'flex'}}> Welcome TO
            <Text style={{color:Colors.PRIMARY }}>      CODEBOX  </Text>
            
        </Text>

        <Text style={{fontSize:20 ,marginTop:7 ,color:Colors.GRAY }}> Learn Programming To Build Real Life Projects.</Text>

        <TouchableOpacity onPress={ handleSignIn} style={styles.button}> 
            <Text style={{textAlign:'center',color:Colors.WHITE,fontSize:18}}>SignIn</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleSignUp}>
        <Text style={{marginTop:-40,color:Colors.PRIMARY,textAlign:'center',fontSize:16}}>Create New Account</Text>
        </TouchableOpacity>
        
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    button:{
        padding:16,
        backgroundColor:Colors.PRIMARY,
        borderRadius:99,
        margin:60
    }
})
