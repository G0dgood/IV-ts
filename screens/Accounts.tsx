import React from 'react';
import { StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Text, View, } from '../components/Themed';
import { Entypo } from '@expo/vector-icons';
import { useAppSelector, useAppDispatch } from '../hooks/useStore';
import { logoutUser } from "../features/authSlice";
import * as Haptics from 'expo-haptics';

const PersonalInformation = () => {

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);



  return (
    <View style={styles.PersonalInformationContainer} lightColor="#fff" darkColor="#000">

      <View style={styles.InformationIconContainer}>
        <Text>
          <Entypo style={styles.userIcon1} name="user" size={70} />
        </Text>
      </View>

      {/* Personal Information Section */}
      <View>

        <View style={styles.PersonalInformationView}>
          <View  >
            <View style={styles.modalTextInput}>
              <View style={styles.modalTextInputCOl}>
                <View style={styles.modalTextInputMargin}>
                  <Text style={styles.infoInputColor}>First Name</Text></View>
                <View>
                  <Text style={styles.infoInputColor}>
                    {/* @ts-ignore */}
                    {user?.displayName}
                  </Text>
                </View>
              </View>
              <View style={styles.modalTextInputCOl}>
                <View><Text style={styles.infoInputColor}>Phone</Text></View>
                <View>
                  <Text style={styles.infoInputColor}>
                    N/A
                  </Text>
                </View>
              </View>
              <View style={styles.modalTextInputCOl}>
                <View><Text style={styles.infoInputColor}>Email</Text></View>
                <View>
                  <Text style={styles.infoInputColor}>
                    {/* @ts-ignore */}
                    {user?.email}
                  </Text>
                </View>
              </View>
              <View style={styles.modalTextInputCOl}>
                <View><Text style={styles.infoInputColor}>Address</Text></View>
                <View>
                  <Text style={styles.infoInputColor}>
                    N/A
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* @ts-ignore */}
          <TouchableOpacity style={styles.infoInputButton} onPress={() => dispatch(logoutUser(), Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy))} >
            <Text style={styles.infoInputSaveButton}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

export default PersonalInformation;


const styles = StyleSheet.create({
  titleStyle: {
    position: 'relative',
    top: -20
  },

  messageStyle: {
    fontSize: 20,
    fontWeight: '800',
    width: 180,
    textAlign: 'center',
    color: "#04224E",
    position: 'relative',
    bottom: 20
  },

  cancelButton: {
    backgroundColor: '#007AFF',
    position: 'relative',
    width: 181,
    height: 39,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 20,
  },

  container: {

    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff',
    width: 319,
    height: 314,
    borderRadius: 20,
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },


  infoInputSaveButton: {
    fontWeight: 'bold',
    color: "#FF4622",
  },

  infoInputButton: {
    width: 255,
    height: 39,
    backgroundColor: "#FEEAEA",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
    alignSelf: 'center',
    borderRadius: 5,
  },

  PersonalInformationView: {
    marginRight: 28,
    marginLeft: 28,
  },

  infoInputColor: {
    color: '#9CA5C5',
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',

  },


  modalTextInputMargin: {
    paddingRight: '10%',

  },

  modalTextInputCOl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? 12 : 20,
    alignItems: 'flex-end',
    borderBottomColor: '#BEC3D5',
    borderBottomWidth: 1
  },

  modalTextInput: {

    flexDirection: 'column',
    justifyContent: 'space-between',

  },

  ButtonToggleInfo: {
    marginRight: 20,
    marginLeft: 20,
    backgroundColor: '#F6F6F6',
    padding: 2,
    borderRadius: 6,
    borderColor: '#aaa',
    marginBottom: 10,
    borderWidth: 0.5,
    marginTop: 20,
  },

  userIcon1: {
    color: '#007AFF'
  },
  userIcon: {
    color: '#32BEA6'
  },

  InformationIconContainer: {

    width: 150,
    height: 140,
    backgroundColor: '#F2F8FF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 100,

  },

  PersonalInformationContainer: {
    flex: 1,
    // backgroundColor: '#fff'
  }

})