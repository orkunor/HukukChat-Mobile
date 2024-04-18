import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import 'react-native-gesture-handler';
import Welcome from '../screens/auth/Welcome';
import ResetPassword from '../screens/auth/ResetPassword';
import EnterCode from '../screens/auth/EnterCode';


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
         <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
        name="EnterCode"
        component={EnterCode}
        options={{headerShown: false}}></Stack.Screen>
    </Stack.Navigator>
    
  );
}

export default AuthStackNavigation;
