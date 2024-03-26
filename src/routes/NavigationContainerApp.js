import AppStackNavigation from "./AppStackNavigation"
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { selectSignIn, setSignIn } from "../slices/authSlices";
import AuthStackNavigation from "./AuthStackNavigation";

const NavigationContainerApp = () => {
const dispatch = useDispatch()
const userTokenSelector = useSelector(selectSignIn)
               const getData = async () => {
                              try {
                                const value = await AsyncStorage.getItem('jwt');
                                if (value !== null) {
                                  dispatch(setSignIn(value));
                                }
                              } catch (e) {
                                console.log(e);
                              }
                            };

                            if (!userTokenSelector) {
                              getData();
                              console.log('Storage dan geldi')
                            } else {
                              console.log('Zaten token var');
                            }
               
return(
               <NavigationContainer>
                              {userTokenSelector ? <AppStackNavigation/> : <AuthStackNavigation/>}
               </NavigationContainer>
)


}
export default NavigationContainerApp