import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import GlobalApi from '../Utilis/GlobalApi';
import { useContext } from 'react';
import { MembershipContex, UserDetailsContext } from "../../App";
import { useNavigation } from '@react-navigation/native';

const MembershipUpgradeScreen = ({ navigation }) => {
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const {isMember , setIsMember} = useContext(MembershipContex)
     navigation = useNavigation();

  const handlePurchase = (plan) => {
    // Implement your purchase logic here
    console.log(`Purchasing ${plan} plan`);
    // After successful purchase, you might want to navigate to a success screen or update the user's membership status
  };
     
     const saveNewMembership = ()=> {
        GlobalApi.createNewMembership(userDetails.email).then(resp => {
                  if(resp)
                  {
                    setIsMember(true)
                    Alert.alert('Great!!!', 'Thank you for joining member.',[
           
                        {
                          text:"ok",
                          onPress:()=> navigation.goBack(),
                          style:'cancel'
                        }
                
                      ]);
                  }
        })
     }  

  return (
    <View style={styles.container}>
      <Image source={require("./../../assets/images/rocket2.jpg")} style={styles.image} />
      <Text style={styles.title}>Upgrade to Pro</Text>
      <TouchableOpacity
        style={styles.plan}
        onPress={() => handlePurchase('1 Month')}
      >
        <Text style={styles.planText}>1 Month</Text>
        <Text style={styles.price}>$4.99</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.plan}
        onPress={() => handlePurchase('1 Year')}
      >
        <Text style={styles.planText}>1 Year</Text>
        <Text style={styles.price}>$39.99</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.getMembershipButton} onPress={() => saveNewMembership()}>
        <Text style={styles.getMembershipButtonText}>Get Membership Now</Text>
      </TouchableOpacity>
      <Text style={styles.description}>
        You can purchase the membership to access all courses along with source code and extras.
      </Text>
      <Text style={styles.cancelInfo}>
        If you want to cancel membership then email us on: admin@coderbox.com
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 500,
    height: 400,
    resizeMode: 'contain',
    marginTop: -20,
    borderRadius:99
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  plan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  planText: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  getMembershipButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    width: '100%',
    borderRadius: 8,
    marginTop: 20,
  },
  getMembershipButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  description: {
    textAlign: 'center',
    marginTop: 20,
  },
  cancelInfo: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default MembershipUpgradeScreen;