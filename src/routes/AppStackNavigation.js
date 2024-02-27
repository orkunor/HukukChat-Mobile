import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Chat from '../screens/app/chat/Chat';
import 'react-native-gesture-handler';


const Stack = createStackNavigator();

function AppStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}></Stack.Screen>
        
    </Stack.Navigator>
    
  );
}

export default AppStackNavigation;
