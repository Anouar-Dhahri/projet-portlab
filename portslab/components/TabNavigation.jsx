import React, {useEffect} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import {ImportTab, ExportTab } from './../views'
import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigation = ({navigation}) => {

  const route = useRoute();
  useEffect(() => {
    console.log(route.params.user)
  }, [])
  return (
    <Tab.Navigator
      initialRouteName='ImportTab'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'ImportTab') {
            iconName = focused
              ? 'package'
              : 'package';
          } else if (route.name === 'ExportTab') {
            iconName = focused 
              ? 'layers' 
              : 'layers';
          }
          // You can return any component that you like here!
          return <Feather name={iconName} size={30} color={color} />;
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#3498DB',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 60}
      })}
    >
      <Tab.Screen initialParams={{user: route.params.user}} name="ImportTab" component={ImportTab} />
      <Tab.Screen initialParams={{user: route.params.user}} name="ExportTab" component={ExportTab} />
    </Tab.Navigator>
  )
}

export default TabNavigation