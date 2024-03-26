import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Chat from '../screens/app/chat/Chat';
import 'react-native-gesture-handler';
import Welcome from '../screens/auth/Welcome';


const Stack = createStackNavigator();

function AppStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Chat">
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}></Stack.Screen>
       
      
    </Stack.Navigator>
    
  );
}

export default AppStackNavigation;
