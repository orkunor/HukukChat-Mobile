import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './src/screens/auth/Login'
import Register from './src/screens/auth/Register'
import Chat from './src/screens/app/chat/Chat'
import Welcome from './src/screens/auth/Welcome'
import NavigationContainerApp from './src/routes/NavigationContainerApp'
import { store } from './store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
  <NavigationContainerApp/>

    </Provider>
  )
}
 // feedback buttons
 //mail
 // çözümler block
//cihaz windows
 //dev acccount


export default App

const styles = StyleSheet.create({



})