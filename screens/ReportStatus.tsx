import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, TextInput, ScrollView, Dimensions, Alert, Platform, Button } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import { List } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import { useRoute } from '@react-navigation/native';
import { useAppSelector } from '../hooks/useStore';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, View, } from '../components/Themed';
import { baseUrl } from '../shared/baseUrl';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import ImageUpload from '../components/ImageUpload';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ReportStatus = ({ navigation }: any) => {

  const route = useRoute();
  // @ts-ignore
  const { name, requestId, category, requestItemId, Employee, Certificate, Tenant } = route.params;
  const { user } = useAppSelector((state: { auth: any; }) => state.auth)


  const [location, setLocation] = useState(null);
  const [addresscoords, setAddresscoords] = useState<any>([]);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [photo, setPhoto] = React.useState<any>(false);

  useEffect(() => {
    (async () => {

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location: any = await Location.getCurrentPositionAsync({});
      const address: any = await Location.reverseGeocodeAsync(location.coords)
      setLocation(location);
      setAddresscoords({
        'street': address[0]?.street,
        'city': address[0]?.city,
        'region': address[0]?.region,
        'country': address[0]?.country
      })
    })();
  }, [requestId]);

  let a = 'W ';
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    a = (JSON.parse(text))
  }

  useEffect(() => {
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
      a = (JSON.parse(text))
    }
  }, [name])



  const [client, setclient] = useState<string>('')
  const [clientscomment, setclientscomment] = useState<string>('')
  const [designation, setdesignation] = useState<string>('')
  const [designationcomment, setdesignationcomment] = useState<string>('')
  // const [searchDate, setsearchDate] = useState<string>('')
  const [searchDatecomment, setsearchDatecomment] = useState<string>('')
  const [fullName, setfullName] = useState<string>('')
  const [fullNamecomment, setfullNamecomment] = useState<string>('')
  const [residentialAddress, setresidentialAddress] = useState<string>('')
  const [residentialAddresscomment, setresidentialAddresscomment] = useState<string>('')
  const [phoneNo, setphoneNo] = useState<string>('')
  const [phoneNocomment, setphoneNocomment] = useState<string>('')
  const [meansOfId, setmeansOfId] = useState<string>('')
  const [meansOfIdcomment, setmeansOfIdcomment] = useState<string>('')
  const [guarantorsName, setguarantorsName] = useState<string>('')
  // const [guarantorsNametwo, setguarantorsNametwo] = useState<string>('')
  const [guarantorsNamecomment1, setguarantorsNamebcomment1] = useState<string>('')
  // const [guarantorsNamecomment2, setguarantorsNamebcomment2] = useState<string>('')
  const [guarantorsAddressone, setguarantorsAddressone] = useState<string>('')
  // const [guarantorsAddresstwo, setguarantorsAddresstwo] = useState<string>('')
  const [guarantorsAddresscomment1, setguarantorsAddresscomment1] = useState<string>('')
  // const [guarantorsAddresscomment2, setguarantorsAddresscomment2] = useState<string>('')
  const [previousWork, setpreviousWork] = useState<string>('')
  const [previousWorkcomment, setpreviousWorkcomment] = useState<string>('')
  const [socialMediaName, setsocialMediaName] = useState<string>('')
  const [socialMediaNamecomment, setsocialMediaNamecomment] = useState<string>('')
  const [employmentReport, setemploymentReport] = useState<string>('')
  const [employmentReportcomment, setemploymentReportcomment] = useState<string>('')
  const [guarantors1, setguarantors1] = useState<string>('')
  const [guarantors1comment, setguarantors1comment] = useState<string>('')
  const [searchReport, setsearchReport] = useState<string>('09-10-2021')
  const [searchReportcomment, setsearchReportcomment] = useState<string>('')
  const [observation, setobservation] = useState<string>('')
  const [observationcomment, setobservationcomment] = useState<string>('')
  const [visuals, setvisuals] = useState<string>('')
  const [visualscomment, setvisualscomment] = useState<string>('')
  const [visualsimageUrl, setvisualsimageUrl] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [addresscomment, setAddresscomment] = useState<string>('')

  // TENANT
  const [companyName, setcompanyName] = useState<string>('')
  const [companyNamecomment, setcompanyNamecomment] = useState<string>('')
  const [spouseName, setspouseName] = useState<string>('')
  const [spouseNamecomment, setspouseNamecomment] = useState<string>('')
  const [email, setemail] = useState<string>('')
  const [emailcomment, setemailcomment] = useState<string>('')
  const [companyAddress, setcompanyAddress] = useState<string>('')
  const [companyAddresscomment, setcompanyAddresscomment] = useState<string>('')
  const [landlordInfo, setlandlordInfo] = useState<string>('')
  const [landlordInfocomment, setlandlordInfocomment] = useState<string>('')

  //  GPS Location
  const [gpslocation, setGPSLocation] = useState<string>('')

  const [isError, setisError] = useState(false);
  const [message, setMessage] = useState("");


  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [searchDate, setsearchDate] = useState('')
  const [view, setView] = useState(false);

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event: any, value: any) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  useEffect(() => {
    setsearchDate(date.toLocaleDateString())
    setGPSLocation((addresscoords?.street === null ? '' : addresscoords?.street) + " " + addresscoords?.city + " " + addresscoords?.region + " " + addresscoords?.country)
  }, [date, addresscoords])

  const handleView = () => {
    if (!view) {
      setView(true)
      setIsPickerShow(false)
    } else {
      setView(!view)
      setIsPickerShow(false)
    }
  }






  const value = {
    "serviceCode": category,
    "requestId": requestId,
    "requestItemId": requestItemId,
    "data": {
      "client": {
        "value": client,
        "comment": clientscomment,
      },
      "applicant": {
        "designation": {
          "value": designation,
          "comment": designationcomment,
        },
        "searchDate": {
          "value": searchDate,
          "comment": searchDatecomment,
        },
        "fullName": {
          "value": fullName,
          "comment": fullNamecomment
        },
        "residentialAddress": {
          "value": residentialAddress,
          "comment": residentialAddresscomment
        },
        "phoneNo": {
          "value": phoneNo,
          "comment": phoneNocomment
        },
        "meansOfId": {
          "value": meansOfId,
          "comment": meansOfIdcomment
        },
        "guarantors": [
          {
            "fullName": {
              "value": guarantorsName,
              "comment": guarantorsNamecomment1,
            },
            "address": {
              "value": guarantorsAddressone,
              "comment": guarantorsAddresscomment1
            }
          }
        ],
        "previousWork": {
          "value": previousWork,
          "comment": previousWorkcomment
        }
      },
      "searchReport": {
        "fullName": {
          "value": searchReport,
          "comment": searchReportcomment,
        },
        "socialMediaName": {
          "value": socialMediaName,
          "comment": socialMediaNamecomment,
        },
        "residentialAddress": {
          "value": residentialAddress,
          "comment": residentialAddresscomment,
        },
        "employmentReport": {
          "value": employmentReport,
          "comment": employmentReportcomment,
        },
        "guarantors": [
          {
            "fullName": {
              "value": guarantors1,
              "comment": guarantors1comment,
            },
            "address": {
              "value": address,
              "comment": addresscomment,
            }
          }
        ]
      },
      "observation": {
        "value": observation,
        "comment": observationcomment,
      },
      "visuals": [
        {
          "description": visuals,
          "imageUrl": visualsimageUrl,
        }
      ]
    }
  }


  const TENANT = {
    "serviceCode": category,
    "requestId": requestId,
    "requestItemId": requestItemId,
    "data": {
      "client": {
        "value": client,
        "comment": clientscomment,
      },
      "applicant": {
        "searchDate": {
          "value": searchDate,
          "comment": searchDatecomment,
        },
        "fullName": {
          "value": fullName,
          "comment": fullNamecomment
        },
        "residentialAddress": {
          "value": residentialAddress,
          "comment": residentialAddresscomment
        },
        "companyName": {
          "value": companyName,
          "comment": companyNamecomment
        },
        "companyAddress": {
          "value": companyAddress,
          "comment": companyAddresscomment
        },
        "phoneNo": {
          "value": phoneNo,
          "comment": phoneNocomment
        },
        "spouseName": {
          "value": spouseName,
          "comment": spouseNamecomment
        },
        "email": {
          "value": email,
          "comment": emailcomment
        },
        "meansOfId": {
          "value": meansOfId,
          "comment": meansOfIdcomment
        },
        "landlordInfo": {
          "value": landlordInfo,
          "comment": landlordInfocomment
        },
        "guarantors": [
          {
            "fullName": {
              "value": guarantors1,
              "comment": guarantors1comment,
            },
            "address": {
              "value": address,
              "comment": addresscomment,
            }
          }
        ]
      },
      "searchReport": {
        "fullName": {
          "value": searchReport,
          "comment": searchReportcomment,
        },
        "socialMediaName": {
          "value": socialMediaName,
          "comment": socialMediaNamecomment,
        },
        "residentialAddress": {
          "value": residentialAddress,
          "comment": residentialAddresscomment
        },
        "companyAddress": {
          "value": companyAddress,
          "comment": companyAddresscomment
        },
        "landlordReview": {
          "value": landlordInfo,
          "comment": landlordInfocomment
        },
        "guarantors": [
          {
            "fullName": {
              "value": guarantors1,
              "comment": guarantors1comment,
            },
            "address": {
              "value": guarantorsAddressone,
              "comment": guarantorsAddresscomment1
            }
          }
        ]
      },
      "observation": {
        "value": observation,
        "comment": observationcomment,
      },
      "visuals": [
        {
          "description": visuals,
          "imageUrl": visualsimageUrl,
        }
      ]
    }
  }




  const handleSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.idToken}`,
      },
    };
    setLoading(true);
    axios
      .post(baseUrl + `/agent/report/create`, category === "EMPLOYEE" ? value : TENANT, config)
      .then((res: { data: any; }) => {
        navigation.replace('SuccessConfirmed', { name })
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        console.log("Success", res.data);
        setLoading(false);
      })
      .catch((err: { message: any; }) => {
        console.log('err', err);
        setMessage(err?.message);
        setLoading(false);
        setisError(true);
      });
  }


  useEffect(() => {
    if (isError) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      Alert.alert(message);
      setTimeout(() => {
        setisError(false)
      }, 1000);
    }
  }, [isError])


  useEffect(() => {
    if (name === "Employee Verification") {
      try {
        setclient(Employee[0]?.fullName)
        setdesignation('')
        setsearchDate('')
        setfullName(Employee[0]?.fullName)
        setresidentialAddress('')
        setphoneNo(Employee[0]?.phoneNo)
        setmeansOfId(Employee?.identity)
        // guarantorsNametwo('')
        setguarantorsAddressone(Employee[0]?.residentialAddress)
        setpreviousWork('')
        setsocialMediaName('')
        setemploymentReport('')
        // setguarantors1('')
        // setguarantors2('')
        setvisuals('')
        setobservation('')
      } catch (err) {
        console.log(err);
      }
    } else if (name === "Certificate Verification") {
      try {
        setclient(Certificate[0]?.fullName)
        setdesignation('')
        setsearchDate('')
        setfullName(Certificate[0]?.fullName)
        setresidentialAddress('')
        setphoneNo('')
        setmeansOfId('')
        // guarantorsNametwo('')
        setguarantorsAddressone('')
        setpreviousWork('')
        setsocialMediaName('')
        setemploymentReport('')
        // setguarantors1('')
        // setguarantors2('')
        setvisuals('')
        setobservation('')
      } catch (err) {
        console.log(err);
      }
    } else if (name === "Tenant Verification") {
      try {
        setclient(Tenant[0]?.fullName)
        setdesignation('')
        setsearchDate('')
        setfullName(Tenant[0]?.fullName)
        setresidentialAddress('')
        setphoneNo(Tenant[0]?.phoneNo)
        setmeansOfId(Tenant?.identity)
        // guarantorsName()
        setguarantorsAddressone(Tenant[0]?.residentialAddress),
          setpreviousWork('')
        setsocialMediaName('')
        setemploymentReport('')
        // setguarantors1('')
        // setguarantors2('')
        setvisuals('')
        setobservation('')
      } catch (err) {
        console.log(err);
      }
    }
  }, [name, Employee, Tenant]);




  const [Loading, setLoading] = useState<any>(false);
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [expanded1, setExpanded1] = React.useState(true);
  const handlePress1 = () => setExpanded1(!expanded1);
  const [expanded2, setExpanded2] = React.useState(true);
  const handlePress2 = () => setExpanded2(!expanded2);
  const [expanded3, setExpanded3] = React.useState(true);
  const handlePress3 = () => setExpanded3(!expanded3);
  const [expanded4, setExpanded4] = React.useState(true);
  const handlePress4 = () => setExpanded4(!expanded4);
  const [expanded5, setExpanded5] = React.useState(true);
  const handlePress5 = () => setExpanded5(!expanded5);
  const [expanded6, setExpanded6] = React.useState(true);
  const handlePress6 = () => setExpanded6(!expanded6);
  const [expanded7, setExpanded7] = React.useState(true);
  const handlePress7 = () => setExpanded7(!expanded7);
  const [expanded8, setExpanded8] = React.useState(true);
  const handlePress8 = () => setExpanded8(!expanded8);
  const [expanded9, setExpanded9] = React.useState(true);
  const handlePress9 = () => setExpanded9(!expanded9);
  const [expanded10, setExpanded10] = React.useState(true);
  const handlePress10 = () => setExpanded10(!expanded10);
  const [expanded11, setExpanded11] = React.useState(true);
  const handlePress11 = () => setExpanded11(!expanded11);
  const [expanded12, setExpanded12] = React.useState(true);
  const handlePress12 = () => setExpanded12(!expanded12);
  const [expanded13, setExpanded13] = React.useState(true);
  const handlePress13 = () => setExpanded13(!expanded13);
  const [expanded14, setExpanded14] = React.useState(true);
  const handlePress14 = () => setExpanded14(!expanded14);
  const [expanded15, setExpanded15] = React.useState(true);
  const handlePress15 = () => setExpanded15(!expanded15);
  const [expanded16, setExpanded16] = React.useState(true);
  const handlePress16 = () => setExpanded16(!expanded16);
  const [expanded17, setExpanded17] = React.useState(true);
  const handlePress17 = () => setExpanded17(!expanded17);
  const [expanded18, setExpanded18] = React.useState(true);
  const handlePress18 = () => setExpanded18(!expanded18);


  // console.log(gpslocation)


  return (
    <View style={styles.container} lightColor="#f9fafd">
      <ScrollView style={{ padding: 20, }}>
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
          <Text style={styles.text}>{name}</Text>


          {/* <SearchScreen
            //  @ts-ignore
            latitude={a?.coords?.latitude}
            //  @ts-ignore
            longitude={a?.coords?.longitude}
          /> */}
          {/* <Text style={styles.streetstreet} >
            {':=>'}
            {addresscoords?.street} {""}
            {addresscoords?.city} {""}
            {addresscoords?.region} {""}
            {addresscoords?.country} */}

          {/* @ts-ignore */}
          {/* {a?.coords?.latitude}   {a?.coords?.longitude} */}
          {/* </Text> */}
          <List.Section >
            <List.Accordion
              title="GPS Location"
              expanded={expanded14}
              onPress={handlePress14}
            >
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  GPS Location
                </Text>
                <TextInput
                  defaultValue={gpslocation === undefined ? "Loading Location..." : gpslocation}
                  style={styles.input}
                  placeholder={'GPS Location'}
                  placeholderTextColor="#1113"
                  onChangeText={setcompanyName}
                />
              </View>

            </List.Accordion>
            {/* client  */}
            <List.Accordion
              title="Client"
              expanded={expanded}
              onPress={handlePress}>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Clients Name
                </Text>
                <TextInput
                  value={client}
                  style={styles.input}
                  placeholder={'client comment'}
                  placeholderTextColor="#1113"
                  onChangeText={setclient}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  numberOfLines={1}
                  value={clientscomment}
                  onChangeText={setclientscomment}
                  style={styles.input}
                  placeholder={'client comment'}
                  placeholderTextColor="#1113"
                />
              </View>
            </List.Accordion>

            {/* Designation  */}
            {/* <List.Accordion
              title="Designation"
              expanded={expanded1}
              onPress={handlePress1}>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Designation
                </Text>
                <TextInput
                  value={designation}
                  style={styles.input}
                  placeholder={'Designation'}
                  placeholderTextColor="#1113"
                  onChangeText={setdesignation}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  value={designationcomment}
                  style={styles.input}
                  placeholder={'Designation Comment'}
                  placeholderTextColor="#1113"
                  onChangeText={setdesignationcomment}
                />
              </View>
            </List.Accordion> */}

            {/* Search Date */}
            <List.Accordion
              title="Search Date"
              expanded={expanded2}
              onPress={handlePress2}>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Search Date
                </Text>
              </View>
              {/* The button that used to trigger the date picker */}
              <View style={styles.signupinputmain}>
                {/* Display the selected date */}
                {/* <Text style={styles.KYCClientInputText}>Date of Birth</Text> */}
                <View style={styles.pickedContainer}>
                  <View style={styles.pickedDateContainer}>
                    <Text style={styles.pickedDate}>{date.toLocaleDateString()}</Text>
                  </View>

                  {/* The button that used to trigger the date picker */}
                  <View style={styles.btnContainer}>
                    {!isPickerShow && (
                      <View lightColor="#eee" darkColor="#fff">
                        <TouchableOpacity onPress={showPicker} >
                          <Text>
                            <AntDesign name="calendar" size={30} color={"#fff"} style={styles.Close} />
                          </Text>
                        </TouchableOpacity>
                      </View>)}

                    {isPickerShow &&
                      <View lightColor="#eee" darkColor="#fff">
                        <TouchableOpacity onPress={handleView} style={styles.ContainerClose} >
                          <Text style={styles.Close} >Close</Text>
                        </TouchableOpacity>
                      </View>}
                  </View>
                </View>

                {/* The date picker */}
                {isPickerShow && (
                  <DateTimePicker
                    value={date}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onChange}
                    style={styles.datePicker}
                  />
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  value={searchDatecomment}
                  style={styles.input}
                  numberOfLines={5}
                  placeholder={'Search Comment'}
                  placeholderTextColor="#1113"
                  onChangeText={setsearchDatecomment}
                />
              </View>
            </List.Accordion>


            {/* fullName */}
            <List.Accordion
              title="FullName"
              expanded={expanded3}
              onPress={handlePress3}>

              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Full Name
                </Text>
                <TextInput
                  value={fullName}
                  style={styles.input}
                  numberOfLines={1}
                  placeholder={'fullName'}
                  placeholderTextColor="#1113"
                  onChangeText={setfullName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  value={fullNamecomment}
                  style={styles.input}
                  numberOfLines={5}
                  placeholder={'FullName Comment'}
                  placeholderTextColor="#1113"
                  onChangeText={setfullNamecomment}
                />
              </View>
            </List.Accordion>

            <List.Accordion
              title="Residential Address"
              expanded={expanded4}
              onPress={handlePress4}
            >
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Residential Address
                </Text>
                <TextInput
                  value={residentialAddress}
                  style={styles.input}
                  placeholder={'residentialAddress'}
                  placeholderTextColor="#1113"
                  onChangeText={setresidentialAddress}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  numberOfLines={5}
                  value={residentialAddresscomment}
                  style={styles.input}
                  placeholder={'Residential Comment'}
                  placeholderTextColor="#1113"
                  onChangeText={setresidentialAddresscomment}
                />
              </View>

            </List.Accordion>

            {/* <List.Accordion
              title="Company Name"
              expanded={expanded14}
              onPress={handlePress14}
            >
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Company Name
                </Text>
                <TextInput
                  value={companyName}
                  style={styles.input}
                  placeholder={'Company Name'}
                  placeholderTextColor="#1113"
                  onChangeText={setcompanyName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  value={companyNamecomment}
                  style={styles.input}
                  placeholder={'Company Name Comment'}
                  placeholderTextColor="#1113"
                  onChangeText={setcompanyNamecomment}
                />
              </View>

            </List.Accordion> */}
            <List.Accordion
              title="Company Address"
              expanded={expanded17}
              onPress={handlePress17}
            >
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Company Address
                </Text>
                <TextInput
                  value={companyAddress}
                  style={styles.input}
                  placeholder={'Company Address'}
                  placeholderTextColor="#1113"
                  onChangeText={setcompanyAddress}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  numberOfLines={5}
                  value={companyAddresscomment}
                  style={styles.input}
                  placeholder={'Company Address Commnet'}
                  placeholderTextColor="#1113"
                  onChangeText={setcompanyAddresscomment}
                />
              </View>

            </List.Accordion>

            {/* Phone Number */}
            <List.Accordion
              title="Phone Number"
              expanded={expanded5}
              onPress={handlePress5}>

              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Phone Number
                </Text>
                <TextInput
                  value={phoneNo}
                  style={styles.input}
                  placeholder={'phone Number'}
                  placeholderTextColor="#1113"
                  onChangeText={setphoneNo}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  numberOfLines={5}
                  value={phoneNocomment}
                  style={styles.input}
                  placeholder={'Phone Number Comment'}
                  placeholderTextColor="#1113"
                  onChangeText={setphoneNocomment}
                />
              </View>

            </List.Accordion>
            {/* Spouse Name */}
            {/* <List.Accordion
              title="Spouse Name"
              expanded={expanded15}
              onPress={handlePress15}>

              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Spouse Name
                </Text>
                <TextInput
                  value={spouseName}
                  style={styles.input}
                  placeholder={' Spouse Name'}
                  placeholderTextColor="#1113"
                  onChangeText={setspouseName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  value={spouseNamecomment}
                  style={styles.input}
                  placeholder={'Spouse Name Comment'}
                  placeholderTextColor="#1113"
                  onChangeText={setspouseNamecomment}
                />
              </View>

            </List.Accordion> */}
            {/* email */}
            {/* <List.Accordion
              title="email"
              expanded={expanded16}
              onPress={handlePress16}>

              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  email
                </Text>
                <TextInput
                  value={email}
                  style={styles.input}
                  placeholder={' email'}
                  placeholderTextColor="#1113"
                  onChangeText={setemail}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  value={emailcomment}
                  style={styles.input}
                  placeholder={'email Comment'}
                  placeholderTextColor="#1113"
                  onChangeText={setemailcomment}
                />
              </View>

            </List.Accordion> */}

            {/* Mean so fId */}
            <List.Accordion
              title="Means Of Identification"
              expanded={expanded6}
              onPress={handlePress6}>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Means Of Identification
                </Text>
                <TextInput
                  value={meansOfId}
                  style={styles.input}
                  // numberOfLines={1}
                  placeholder={'Means Of Identification'}
                  placeholderTextColor="#1113"
                  onChangeText={setmeansOfId}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  numberOfLines={5}
                  value={meansOfIdcomment}
                  style={styles.input}
                  placeholder={'Means Of Identification Comment'}
                  placeholderTextColor="#1113"
                  onChangeText={setmeansOfIdcomment}
                />
              </View>
            </List.Accordion>

            {/* Land Lord Info*/}
            {name === "Tenant Verification" && <List.Accordion
              title="Land Lord Info"
              expanded={expanded6}
              onPress={handlePress6}>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Land Lord Info
                </Text>
                <TextInput
                  value={landlordInfo}
                  style={styles.input}
                  // numberOfLines={1}
                  placeholder={'Land Lord Info'}
                  placeholderTextColor="#1113"
                  onChangeText={setlandlordInfo}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  numberOfLines={5}
                  value={landlordInfocomment}
                  style={styles.input}
                  placeholder={'Land Lord Info Comment'}
                  placeholderTextColor="#1113"
                  onChangeText={setlandlordInfocomment}
                />
              </View>
            </List.Accordion>}


            {/* Guarantors Name */}
            {/* <List.Accordion
              title="Guarantors Name"
              expanded={expanded7}
              onPress={handlePress7}>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Guarantors Name
                </Text>
                <TextInput
                  value={guarantorsName}
                  style={styles.input}
                  placeholder={'Guarantors Name'}
                  placeholderTextColor="#1113"
                  onChangeText={setguarantorsName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  value={guarantorsNamecomment1}
                  style={styles.input}
                  placeholder={'Guarantors Name'}
                  placeholderTextColor="#1113"
                  onChangeText={setguarantorsNamebcomment1}
                />
              </View>

            </List.Accordion> */}



            {/* Guarantors Address */}
            {/* <List.Accordion
              title="Guarantors Address"
              expanded={expanded8}
              onPress={handlePress8} >

              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Guarantors Address
                </Text>
                <TextInput
                  value={guarantorsAddressone}
                  style={styles.input}
                  placeholder={'Guarantors Address One'}
                  placeholderTextColor="#1113"
                  onChangeText={setguarantorsAddressone}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  value={guarantorsAddresscomment1}
                  style={styles.input}
                  placeholder={'Guarantors Address Comment One'}
                  placeholderTextColor="#1113"
                  onChangeText={setguarantorsAddresscomment1}
                />
              </View>

            </List.Accordion> */}

            {/* Previous Work */}
            <List.Accordion
              title="Previous Work"
              expanded={expanded9}
              onPress={handlePress9}>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Previous Work
                </Text>
                <TextInput
                  value={previousWork}
                  style={styles.input}
                  placeholder={'previous Work'}
                  placeholderTextColor="#1113"
                  onChangeText={setpreviousWork}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  numberOfLines={5}
                  value={previousWorkcomment}
                  style={styles.input}
                  placeholder={'previous Work Comment'}
                  placeholderTextColor="#1113"
                  onChangeText={setpreviousWorkcomment}
                />
              </View>
            </List.Accordion>


            {/* Social Media Name */}
            {/* <List.Accordion
              title="Social Media Name"
              expanded={expanded10}
              onPress={handlePress10}>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Social Media Name
                </Text>
                <TextInput
                  value={socialMediaName}
                  style={styles.input}
                  placeholder={'Social Media Name '}
                  placeholderTextColor="#1113"
                  onChangeText={setsocialMediaName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  value={socialMediaNamecomment}
                  style={styles.input}
                  placeholder={'Social Media Name comment'}
                  placeholderTextColor="#1113"
                  onChangeText={setsocialMediaNamecomment}
                />
              </View>
            </List.Accordion> */}


            {/* fullName */}
            <List.Accordion
              title="Employment Report"
              expanded={expanded11}
              onPress={handlePress11}>

              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Employment Report
                </Text>
                <TextInput
                  value={employmentReport}
                  style={styles.input}
                  numberOfLines={1}
                  placeholder={'Employment Report  '}
                  placeholderTextColor="#1113"
                  onChangeText={setemploymentReport}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  value={employmentReportcomment}
                  style={styles.input}
                  numberOfLines={5}
                  placeholder={'Employment Report comment'}
                  placeholderTextColor="#1113"
                  onChangeText={setemploymentReportcomment}
                />
              </View>
            </List.Accordion>


            <List.Accordion
              title="Observation"
              expanded={expanded12}
              onPress={handlePress12}>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Observation
                </Text>
                <TextInput
                  value={observation}
                  style={styles.input}
                  placeholder={'Observation'}
                  placeholderTextColor="#1113"
                  onChangeText={setobservation}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Comment
                </Text>
                <TextInput
                  numberOfLines={5}
                  value={observationcomment}
                  style={styles.input}
                  placeholder={'Observation comment'}
                  placeholderTextColor="#1113"
                  onChangeText={setobservationcomment}
                />
              </View>
            </List.Accordion>

            {/* Visuals */}
            <List.Accordion
              title="Visuals"
              expanded={expanded13}
              onPress={handlePress13}>

              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Visuals
                </Text>
                <TextInput
                  value={visuals}
                  style={styles.input}
                  numberOfLines={1}
                  placeholder={'visuals'}
                  placeholderTextColor="#1113"
                  onChangeText={setvisuals}
                />
                <View style={styles.inputContainer}>
                  <Text style={styles.textTitle}>
                    Comment
                  </Text>
                  <TextInput
                    numberOfLines={5}
                    value={visualsimageUrl}
                    style={styles.input}
                    placeholder={'Visuals image Url'}
                    placeholderTextColor="#1113"
                    onChangeText={setobservationcomment}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.textTitle}>
                  Visuals Image Url
                </Text>
                <ImageUpload setPhoto={setPhoto} setvisualsimageUrl={setvisualsimageUrl} />
              </View>

            </List.Accordion>


          </List.Section>
          <View style={styles.Submit}>
            <TouchableOpacity style={photo ? styles.buttonContainer1 : styles.buttonContainer} onPress={handleSubmit}>
              {Loading ? <MaterialIndicator color='white' size={25} style={styles.loadingIcon} /> : <Text style={styles.buttonText}>Submit</Text>}

            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView >
    </View >
  );
};

export default ReportStatus;





const styles = StyleSheet.create({

  loadingIcon: {
    marginBottom: 0,
    paddingBottom: 0
  },
  streetstreet: {
    fontSize: 20,
    fontWeight: 'bold',

  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  pickedDate: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins_300Light',
  },
  pickedDateContainer: {
    padding: 20,
    backgroundColor: "#FBFBFB",
    borderRadius: 5,
  },
  // KYCClientInputText: {
  //   fontSize: 12,
  //   fontWeight: "200",
  //   fontFamily: "Poppins_600SemiBold",
  // },

  signupinputmain: {
    marginBottom: 20,

  },
  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  pickedContainer: {
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 8,
    // padding: 10,
    // fontSize: 16,
    // fontFamily: 'Poppins_400Regular',
    // color: '#333',

    // height: windowHeight / 15,
    // borderColor: '#ccc',  

  },



  ContainerClose: { borderRadius: 10, },
  Close: {
    padding: 8,
    // backgroundColor: "#990000",
    color: "#007AFF",
    fontFamily: 'Poppins_500Medium',
  },
  btnContainer: {
    borderRadius: 10,
  },

  datePickerStyle: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    borderWidth: 0,
    padding: 5,
    paddingHorizontal: 5,
  },

  signupcontainer: {

    // flexDirection: "column",
    // justifyContent: "center",
    // marginTop: Platform.OS === "ios" ? 70 : 50,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },


  Submit: { marginBottom: 100, },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    height: windowHeight / 16,
    backgroundColor: '#007AFF',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonContainer1: {
    marginTop: 20,
    width: '100%',
    height: windowHeight / 16,
    backgroundColor: 'gray',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Poppins_400Regular',
  },

  textTitle: {
    marginBottom: 6,
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold'
  },

  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#333',

    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  container: {
    // backgroundColor: '#f9fafd',
    flex: 1,

  },

  text: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 28,
    marginBottom: 10,
    // color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Poppins_400Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    color: 'grey',
  },
});
