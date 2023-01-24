import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ToastProvider } from 'react-native-toast-notifications'

import { 
  SplashScreen, 
  StarterScreen, 
  LoginScreen, 
  ForgotPasswordScreen,
  ImportFormScreen,
  ExportFormScreen,
  BonEntreeForm,
  BonSortieForm,
  InfoViewer
} from './views'
import DrawerNavigation from './components/DrawerNavigation'
import SideNavigation from './components/SideNavigation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="StarterScreen" component={StarterScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />

          <Stack.Screen name="HelloAgent" component={SideNavigation} />
          
          <Stack.Screen name="HelloResponsable" component={DrawerNavigation} />
          <Stack.Screen name="ImportFormScreen" component={ImportFormScreen} />
          <Stack.Screen name="ExportFormScreen" component={ExportFormScreen} />

          <Stack.Screen name="BonEntreeForm" component={BonEntreeForm} />
          <Stack.Screen name="BonSortieForm" component={BonSortieForm} />

          <Stack.Screen name="InfoViewer" component={InfoViewer} />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}