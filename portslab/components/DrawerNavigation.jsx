import React, { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useToast } from 'react-native-toast-notifications';
import { useRoute } from '@react-navigation/native';
import CustomDrawer from './CustomDrawer';
import { 
  HomeScreen,
  ImportScreen,
  ExportScreen,
  ProfileScreen
} from '../views';

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({ navigation }) => {
  
  const toast = useToast();
  const route = useRoute();

  useEffect(()=> {
    CheckToken();
  }, [])

  const CheckToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if(value == null || value == undefined ) {
        toast.show("Not authorized, please log in !", {
          type: "danger",
          placement:"bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in"
        })
        navigation.navigate("LoginScreen");
      }
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false}}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="Home" 
        component={HomeScreen} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="home-outline" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="Imports" 
        component={ImportScreen} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="arrow-back-circle-outline" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="Exports" 
        component={ExportScreen} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="arrow-forward-circle-outline" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="Profile" 
        component={ProfileScreen}
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="md-person-outline" size={22} color={color}/>
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigation