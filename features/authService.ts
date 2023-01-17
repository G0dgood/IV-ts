import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { baseUrl } from '../shared/baseUrl';
 
 
  
// Login user 
const login = async ( ) => { 
    const userInfo = await AsyncStorage.getItem('user')  
  return userInfo
}
  

// Logout
export const logout = () => {
  AsyncStorage.removeItem('user')
}
 
// All Assigned Request
const allassignedrequest = async (user: { idToken: any; }) => {
  const config = {
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${user?.idToken}`,
         },
  };  
  const { data } = await axios.get(baseUrl+`/admin/requests?page=1&limit=40`, config)  
//  console.log('data',data)
  
  return data
}
 

const authService = { 
  login, 
  logout,
  allassignedrequest
}

export default authService
