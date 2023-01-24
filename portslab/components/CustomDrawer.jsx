import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useToast } from 'react-native-toast-notifications';
import{ DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from './../configs';

const CustomDrawer = props => {

  const toast = useToast();
  
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  useEffect(()=> {
    userData();
  }, [nom, prenom])

  const userData = async () => {
    let user = await AsyncStorage.getItem('@user');
    user = JSON.parse(user)
    setNom(user.nom);
    setPrenom(user.prenom);
  }

  const logout = async () => {
    try {
      let user = await AsyncStorage.getItem('@user');
      user = JSON.parse(user)
      await AsyncStorage.removeItem('@token');
      await axios.post(`${API}/auth/logout`, {
        userId:user._id
      }).then((response) => {
        if(response.data.success) {
          props.navigation.navigate("LoginScreen");
        }
      })
    } catch (error) {
      console.log(error)
    }
    
  }
  
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView>
        <ImageBackground 
          source={require('./../assets/bg.jpg')}
          style={{padding:20}}
        >
          <Image 
            source={require('./../assets/user.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}} 
          />
          <Text
            style={{
            color: '#fff',
            fontSize: 18,
            marginBottom: 5,
            }}
          >
            
            { nom + " " + prenom}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                marginRight: 5,
              }}>
              Online
            </Text>
            <Ionicons name="thumbs-up-sharp" size={16} color="#27AE60" />
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props}/>
        </View>
      </DrawerContentScrollView>

      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={
          logout
        } style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default CustomDrawer