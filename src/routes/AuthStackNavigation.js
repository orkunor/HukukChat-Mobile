import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Chat from '../screens/app/chat/Chat';
import 'react-native-gesture-handler';
import Welcome from '../screens/auth/Welcome';


const Stack = createStackNavigator();

function AuthStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}></Stack.Screen>
         <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}></Stack.Screen>
    </Stack.Navigator>
    
  );
}

export default AuthStackNavigation;
