import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as Haptics from 'expo-haptics';
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../features/authSlice";
import { useAppDispatch } from "../hooks/useStore";
import { MaterialIndicator } from "react-native-indicators";
import { Formik } from 'formik';
import * as yup from 'yup'
import { googleKey, googleUrl } from "../shared/baseUrl";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [success, setsuccess] = useState(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();


  const loginHandler = async () => {
    setisLoading(true)
    const apiKey = `${googleKey}`
    let url = `${googleUrl}/accounts:signInWithPassword?key=` + apiKey;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
        tenantId: "dev-test-ozhpg"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).catch(err => {
      setisLoading(false)
      console.log('err', err);
      alert(err.message);
    })
      // @ts-ignore
      .then(res => res.json())
      .then(async parsedRes => {
        setisLoading(false)
        setsuccess(true)
        console.log('parsedRes', parsedRes);
        if (parsedRes.idToken) {
          await AsyncStorage.setItem('user', JSON.stringify(parsedRes));
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          // @ts-ignore
          dispatch(login(), Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy))
        }
        if (!parsedRes.idToken) {
          alert(parsedRes.error.message);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        } else {
          setisLoading(false)
          // @ts-ignore
          navigation?.replace("Home")
        }
      });
  };



  const [passwordShown, setPasswordShown] = useState(true);
  const [icons, setIcons] = useState("eye-off-outline");
  const togglePasswordVisiblity = () => {
    setIcons(!icons ? "eye-outline" : "eye-off-outline");
    if (icons === "eye-off-outline" && passwordShown === true) {
      setIcons("eye-outline");
      setPasswordShown(false);
    } else {
      setIcons("eye-off-outline");
      setPasswordShown(true);
    }
  };

  function validateEmail(email: any) {
    let error;
    if (!email) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error = 'Invalid email address';
    }
    return error;
  }

  const k: any = (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)

  const loginValidationSchema = yup.object().shape({
    // email: yup
    //   .string()
    //   .email("Please enter valid email")
    //   .matches(k)
    //   .required('Email Address is Required'),
    // password: yup
    //   .string()
    //   .min(8, ({ min }) => `Password must be at least ${min} characters`)
    //   .required('Password is required'),
  })

  return (
    <KeyboardAvoidingView
      style={styles.container1}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.logColor1}>
        <Animatable.View animation="bounceInUp">
          <Ionicons style={styles.fingerPrint} name="finger-print" size={93} />
        </Animatable.View>
        <Image
          style={styles.loginLogo}
          source={require("../assets/images/logo-white.png")}
        />
        <Text style={styles.text2}>
          We're more than just a workplace. We're an evolving family
        </Text>
      </View>

      <View style={styles.logColor2}>
        <Text style={styles.logintext1}>Account Login</Text>
        <Text style={styles.logintext2}>Login using correct credentials</Text>

        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            password: ''
          }}
          onSubmit={loginHandler} >
          {({ handleChange, handleSubmit, errors, values, touched,
          }) => (
            <View>
              <TextInput
                placeholder="Agent ID"
                placeholderTextColor="#20549D"
                style={styles.logininput}
                value={email}
                // onChangeText={handleChange('email')}
                onChangeText={(text) => setEmail(text)}
              />
              {/* {(errors.email || touched.email) &&
        <Text style={styles.errorText}>{errors.email}</Text>
       } */}
              <TextInput
                // onPress={() => togglePasswordVisiblity()}
                secureTextEntry={passwordShown}
                placeholder="Password"
                placeholderTextColor="#20549D"
                style={styles.logininput2}
                value={password}
                // onChangeText={handleChange('password')}
                onChangeText={(text) => setPassword(text)}
              />
              {(errors.password || touched.password) &&
                <Text style={styles.errorText}>{errors.password}</Text>
              }
              <Ionicons
                name={icons}
                size={20}
                style={styles.eyeOutline}
                onPress={() => togglePasswordVisiblity()}
                color={"#BEC3D5"}
              />
              {/* @ts-ignore */}
              <TouchableOpacity style={styles.button} onPress={handleSubmit} >
                <Text style={styles.text}>
                  {isLoading ? (
                    <MaterialIndicator color='white' size={30} />
                  ) : (
                    "LOGIN"
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        {/* <Text
          style={styles.text3}
          onPress={() => navigation.navigate("PasswordReset")}>
          Forgot Password?
        </Text> */}
      </View>
    </KeyboardAvoidingView>
  );
};
export default Login;

const styles = StyleSheet.create({
  errorText: {
    fontSize: 10,
    color: 'red',
    marginLeft: 45,
  },
  eyeOutline: {
    position: "absolute",
    right: 60,
    bottom: 90,
  },

  container1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  fingerPrint: {
    color: "rgba(255,255,255,0.1)",
    fontSize: 214,
    transform: [{ rotate: "130deg" }],
    position: "absolute",
    left: -100,
    top: -65,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 50,
    backgroundColor: "#007AFF",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 25,
    height: 50,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    fontFamily: "Poppins_600SemiBold",
  },
  text3: {
    fontSize: 16,
    textAlign: "center",
    color: "#20549D",
    marginTop: 30,
    fontFamily: "Poppins_600SemiBold",
  },

  logininput: {
    height: 50,
    padding: 8,
    fontSize: 16,
    borderColor: "#BEC3D5",
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 25,
    fontFamily: "Poppins_400Regular",
  },
  logininput2: {
    height: 50,
    padding: 8,
    fontSize: 16,
    borderColor: "#BEC3D5",
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 25,
    fontFamily: "Poppins_400Regular",
  },

  logintext1: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    color: "#20549D",
    fontWeight: "400",
    fontFamily: "Poppins_800ExtraBold",
  },
  logintext2: {
    fontSize: 15,
    textAlign: "center",
    color: "#20549D",
    fontFamily: "Poppins_400Regular",
  },

  finger: {
    width: 250,
    height: 250,
    // marginTop: 40,
    marginLeft: 50,
  },

  text2: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    margin: 25,
  },

  loginLogo: {
    width: 176,
    height: 60,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 200,
  },

  logColor1: {
    flex: 1,
    backgroundColor: "#007AFF",
    width: "100%",
    height: "50%",
  },

  logColor2: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "50%",
  },
});

