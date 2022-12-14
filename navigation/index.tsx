import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import AppLoading from 'expo-app-loading';
import LinkingConfiguration from './LinkingConfiguration';
import AuthStack from './AuthStack';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStack from './AppStack';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import { setUserInfo } from '../features/authSlice';
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { user, isSuccess } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch();
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  React.useEffect(() => {
    userInfo();
  }, [isSuccess]);


  const userInfo = async () => {
    try {
      const info: any = await AsyncStorage.getItem('user')

      dispatch(setUserInfo(JSON.parse(info)))
    }
    catch (e) {
      console.log(`isLoggedIn in error ${e}`)
    }
  }


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {!user ?
          <AuthStack />
          :
          <AppStack />
        }
      </NavigationContainer>
    );
  }
}


