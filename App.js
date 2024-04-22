import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./Apps/Screens/Login";
import { createContext, useEffect, useState } from "react";
import { client } from "./Apps/Utilis/KindConfig";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./Apps/Navigation/TabNavigation";
import { useFonts } from "expo-font";
import HomeNavigation from "./Apps/Navigation/HomeNavigation";
import GlobalApi from "./Apps/Utilis/GlobalApi";

export const AuthContext = createContext();
export const UserDetailsContext = createContext();
export const MembershipContex = createContext();
export const ReloadMethodsContext = createContext();

export default function App() {
  const [userDetails, setUserDetails] = useState();
  const [isMember , setIsMember] = useState(false)
  const [reload , setReload] = useState();

  const [fontsLoaded] = useFonts({
    outfit: require("./assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./assets/fonts/Outfit-Bold.ttf"),
  });

  const [auth, setAuth] = useState(false);

  const checkAuthenticate = async () => {
    // Using `isAuthenticated` to check if the user is authenticated or not
    if (await client.isAuthenticated) {
      const userProfile = await client.getUserDetails();
      setUserDetails(userProfile);
      setAuth(true);
      checkUserMembership();
      
    } else {
      setAuth(false);
      // Need to implement, e.g: redirect user to sign in, etc..
      // return <Login/>
    }
  };

  useEffect(() => {
    checkAuthenticate();
  }, [auth]);

  // check membership
  const checkUserMembership = ()=> {
    GlobalApi.checkUserMembership(userDetails.email).then(resp => {
      console.log(resp);
      setIsMember(resp.memberships?.length>0)
    })
  }

  return (
    <View style={styles.container}>
      {/* <Login /> */}
      <AuthContext.Provider value={{ auth, setAuth }}>
        <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
          <MembershipContex.Provider value={{isMember , setIsMember}}>
            <ReloadMethodsContext.Provider value={{reload , setReload}}>
          <NavigationContainer>
            {auth ? <HomeNavigation /> : <Login />}
          </NavigationContainer>
          </ReloadMethodsContext.Provider>
          </MembershipContex.Provider>
        </UserDetailsContext.Provider>
      </AuthContext.Provider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
