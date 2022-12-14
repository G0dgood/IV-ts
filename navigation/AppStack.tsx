import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { RootTabParamList, RootTabScreenProps } from '../types';
import { Pressable, StyleSheet } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';
import Accounts from '../screens/Accounts';
import Reports from '../screens/Reports';
import Schedule from '../screens/Schedule';
import Home from '../screens/Home';
import Colors from '../constants/Colors';
import AboutUs from '../screens/AboutUs';
import ReportStatus from '../screens/ReportStatus';
import DetailsPage from '../screens/DetailsPage';
import SuccessConfirmed from '../screens/SuccessConfirmed';



const BottomTab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator();


function AuthStack() {





  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator initialRouteName="HomeD" screenOptions={{
      // headerShown: false,
      headerStyle: { backgroundColor: Colors[colorScheme].TopTab },
      headerTintColor: Colors[colorScheme].headerTintColor,
      headerTitleStyle: { fontWeight: 'bold', fontFamily: 'Poppins_500Medium', },
    }}>

      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Reports" component={Reports} />


      <Stack.Screen name="Schedule" component={Schedule} options={{ title: 'Schedule' }} />

      <Stack.Screen name="Accounts" component={Accounts} />
      <Stack.Screen name="ReportStatus" component={ReportStatus} options={({ navigation }) => ({
        title: 'Report Status',
        headerRight: () => (
          <Pressable
            onPress={() => navigation.navigate('Accounts')}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}>
            <FontAwesome name="user-circle-o" size={24} color="black" />
          </Pressable>
        ),

      })} />
      <Stack.Screen name="SuccessConfirmed" component={SuccessConfirmed} options={{ title: 'Success Confirmed', headerShown: false }} />
      <Stack.Screen name="DetailsPage" component={DetailsPage} options={{ title: 'Details Page' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="AboutUs" component={AboutUs} options={{ title: 'About Us' }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}




function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].buttonTab,
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
          headerTitle: '',
          tabBarIcon: ({ color, size }) => <Ionicons name="qr-code" color={color} size={size} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Accounts')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="user-circle-o" color={Colors[colorScheme].text} size={25} style={{ marginRight: 15 }} />
            </Pressable>
          ),

        })}
      />
      <BottomTab.Screen
        name="Schedule"
        component={Schedule}
        options={({ navigation }: RootTabScreenProps<'Schedule'>) => ({
          title: 'Schedule',
          tabBarIcon: ({ color, size }) => <FontAwesome name="calendar" color={color} size={size} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Accounts')}
              style={({ pressed }: any) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="user-circle-o" color={Colors[colorScheme].text} size={25} style={{ marginRight: 15 }} />
            </Pressable>
          ),

        })}
      />

      <BottomTab.Screen
        name="Accounts"
        component={Accounts}
        options={({ navigation }: RootTabScreenProps<'Accounts'>) => ({
          title: 'Accounts',
          tabBarIcon: ({ color, size }) => <FontAwesome name="user-circle-o" color={color} size={size} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('AboutUs')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].buttonTab}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>

  );
}
export default AuthStack;

const styles = StyleSheet.create({

  imageHeader: {
    marginRight: 15,
    width: 30,
    height: 30,
    borderRadius: 5
  },
  imageHeader2: {
    width: 30,
    height: 30,
    borderRadius: 5
  },
})
