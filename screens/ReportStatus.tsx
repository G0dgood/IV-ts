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
import { Formik } from 'formik';
import * as Yup from 'yup'



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





  let a = 'W ';
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    // @ts-ignore
    text = JSON.stringify(location);
    a = (JSON.parse(text))
  }

  useEffect(() => {
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      // @ts-ignore
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
  const [longitude, setlongitude] = useState<string>('')
  const [latitude, setlatitude] = useState<string>('')



  //  GPS Location
  const [gpslocation, setGPSLocation] = useState<string>('')

  const [isError, setisError] = useState(false);
  const [message, setMessage] = useState("");


  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [searchDate, setsearchDate] = useState('')
  const [view, setView] = useState(false);

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
      setlongitude(location?.coords?.longitude)
      setlatitude(location?.coords?.latitude)
      setAddresscoords({
        'street': address[0]?.street,
        'city': address[0]?.city,
        'region': address[0]?.region,
        'country': address[0]?.country
      })
    })();
  }, [requestId]);

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


  // formik validation
  const validate = Yup.object().shape({

    client: Yup.string().min(5, 'Too Short!').required("Client is required").nullable(),
    clientscomment: Yup.string().min(5, 'Too Short!').required("Clients comment is required").nullable(),
    // designation: Yup.string().min(5, 'Too Short!').required("Designation is required").nullable(),
    // designationcomment: Yup.string().min(5, 'Too Short!').required("Designation Comment is required").nullable(),
    // searchDate: Yup.string().min(5, 'Too Short!').required("Search date is required").nullable(),
    searchDatecomment: Yup.string().min(5, 'Too Short!').required("Search date comment is required").nullable(),
    fullName: Yup.string().min(5, 'Too Short!').required("FullName is required").nullable(),
    fullNamecomment: Yup.string().min(5, 'Too Short!').required("FullName comment is required").nullable(),

    residentialAddress: Yup.string().min(5, 'Too Short!').required("Residential address is required").nullable(),
    residentialAddresscomment: Yup.string().min(5, 'Too Short!').required("Residential address comment is required").nullable(),

    phoneNo: Yup.string().min(5, 'Too Short!').required("phone number is required").nullable(),
    phoneNocomment: Yup.string().min(5, 'Too Short!').required("Phone number comment is required").nullable(),

    meansOfId: Yup.string().min(5, 'Too Short!').required("Means of Id is required").nullable(),
    meansOfIdcomment: Yup.string().min(5, 'Too Short!').required("Means of Id comment is required").nullable(),
    // landlordInfo: Yup.string().min(5, 'Too Short!').required("Land lord Info is required").nullable(),
    // landlordInfocomment: Yup.string().min(5, 'Too Short!').required("Land lord Info comment is required").nullable(),
    previousWork: Yup.string().min(5, 'Too Short!').required("Previous Work is required").nullable(),
    previousWorkcomment: Yup.string().min(5, 'Too Short!').required("Previous Work comment is required").nullable(),
    observation: Yup.string().min(5, 'Too Short!').required("Observation is required").nullable(),
    observationcomment: Yup.string().min(5, 'Too Short!').required("Observation comment is required").nullable(),
    visuals: Yup.string().min(5, 'Too Short!').required("visuals description is required").nullable(),
    visualsimageUrl: Yup.string().min(5, 'Too Short!').required("visuals Image Url comment is required").nullable(),

  });


  const handleSubmitReport = (values: any) => {

    const EMPLOYEE = {

      "serviceCode": category,
      "requestId": requestId,
      "requestItemId": requestItemId,
      "data": {
        "client": {
          "value": values.client,
          "comment": values.clientscomment
        },
        "applicant": {
          "designation": {
            "value": values.designation,
            "comment": values.designationcomment
          },
          "searchDate": {
            "value": searchDate,
            "comment": values.searchDatecomment
          },
          "fullName": {
            "value": values.fullName,
            "comment": values.fullNamecomment
          },
          "residentialAddress": {
            "value": values.residentialAddress,
            "comment": values.residentialAddresscomment
          },
          "phoneNo": {
            "value": values.phoneNo,
            "comment": values.phoneNocomment
          },
          "meansOfId": {
            "value": values.meansOfId,
            "comment": values.meansOfIdcomment
          },
          "guarantors": [
            {
              "fullName": {
                "value":
                  guarantorsName,
                "comment":
                  guarantorsNamecomment1
              },
              "address": {
                "value": guarantorsAddressone,
                "comment": guarantorsAddresscomment1
              }
            }
          ],
          "previousWork": {
            "value": values.previousWork,
            "comment": values.previousWorkcomment
          }
        },
        "searchReport": {
          "fullName": {
            "value": values.fullName,
            "comment": values.fullNamecomment
          },
          "socialMediaName": {
            "value": socialMediaName,
            "comment": socialMediaNamecomment
          },
          "residentialAddress": {
            "value": residentialAddress,
            "comment": residentialAddresscomment
          },
          "employmentReport": {
            "value": employmentReport,
            "comment": employmentReportcomment
          },
          "guarantors": [
            {
              "fullName": {
                "value":
                  guarantors1,
                "comment":
                  guarantors1comment
              },
              "address": {
                "value": address,
                "comment": addresscomment
              }
            }
          ]
        },
        "observation": {
          "value": values.observation,
          "comment": values.observationcomment
        },
        "visuals": [
          {
            "description": values.visuals,
            "imageUrl": values.visualsimageUrl
          }
        ],
        "geolocation": {
          "longitude": longitude,
          "latitude": latitude
        }

      }

    }

    const TENANT = {
      "serviceCode": category,
      "requestId": requestId,
      "requestItemId": requestItemId,
      "data": {
        "client": {
          "value": values.client,
          "comment": values.clientscomment
        },
        "applicant": {
          "searchDate": {
            "value": searchDate,
            "comment": values.searchDatecomment
          },
          "fullName": {
            "value": values.fullName,
            "comment": values.fullNamecomment
          },
          "residentialAddress": {
            "value": values.residentialAddress,
            "comment": values.residentialAddresscomment
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
            "value": values.phoneNo,
            "comment": values.phoneNocomment
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
            "value": values.meansOfId,
            "comment": values.meansOfIdcomment
          },
          "landlordInfo": {
            "value": values.landlordInfo,
            "comment": values.landlordInfocomment
          },
          "guarantors": [
            {
              "fullName": {
                "value": guarantors1,
                "comment": guarantors1comment
              },
              "address": {
                "value": address,
                "comment": addresscomment
              }
            }
          ]
        },
        "searchReport": {
          "fullName": {
            "value": values.fullName,
            "comment": values.fullNamecomment
          },
          "socialMediaName": {
            "value": socialMediaName,
            "comment": socialMediaNamecomment
          },
          "residentialAddress": {
            "value": values.residentialAddress,
            "comment": values.residentialAddresscomment
          },
          "companyAddress": {
            "value": companyAddress,
            "comment": companyAddresscomment
          },
          "landlordReview": {
            "value": values.landlordInfo,
            "comment": values.landlordInfocomment
          },
          "guarantors": [
            {
              "fullName": {
                "value": guarantors1,
                "comment": guarantors1comment
              },
              "address": {
                "value": address,
                "comment": addresscomment
              }
            }
          ]
        },
        "observation": {
          "value": values.observation,
          "comment": values.observationcomment
        },
        "visuals": [
          {
            "description": values.visuals,
            "imageUrl": values.visualsimageUrl
          }
        ]
      }

    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.idToken}`,
      },
    };
    setLoading(true);
    axios
      .post(baseUrl + `/agent/report/create`, category === "EMPLOYEE" ? EMPLOYEE : TENANT, config)
      .then((res: { data: any; }) => {
        navigation.replace('SuccessConfirmed', { name })
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        setLoading(false);
      })
      .catch((err: { message: any; }) => {
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
        setresidentialAddress(Employee[0]?.residentialAddress)
        setphoneNo(Employee[0]?.phoneNo)
        setmeansOfId(Employee?.identity)
        setguarantorsAddressone('')
        setpreviousWork('')
        setsocialMediaName('')
        setemploymentReport('')
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
        setguarantorsAddressone('')
        setpreviousWork('')
        setsocialMediaName('')
        setemploymentReport('')
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
        setresidentialAddress(Tenant[0]?.residentialAddress)
        setphoneNo(Tenant[0]?.phoneNo)
        setmeansOfId(Tenant?.identity)
        setguarantorsAddressone(''),
          setpreviousWork('')
        setsocialMediaName('')
        setemploymentReport('')
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





  return (
    <View style={styles.container} lightColor="#f9fafd">
      <ScrollView style={{ padding: 20, }}>
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
          <Text style={styles.text}>{name}</Text>

          {/* @ts-ignore */}
          <Formik
            enableReinitialize={true}
            initialValues={{
              client: client,
              clientscomment: '',
              searchDatecomment: '',
              fullName: fullName,
              fullNamecomment: '',
              residentialAddress: '',
              residentialAddresscomment: '',
              phoneNo: phoneNo,
              phoneNocomment: '',
              meansOfId: '',
              meansOfIdcomment: '',
              previousWork: '',
              previousWorkcomment: '',
              // landlordInfo: '',
              // landlordInfocomment: '',
              observation: '',
              observationcomment: '',
              visuals: '',
              visualsimageUrl: visualsimageUrl,

            }}
            validationSchema={validate}
            onSubmit={handleSubmitReport}
          >

            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }): any => (
              <View>
                <List.Section >

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
                        value={values.client}
                        style={styles.input}
                        placeholder={'client comment'}
                        placeholderTextColor="#1113"
                        onChangeText={handleChange('client')}
                      />
                      {errors.client && <Text style={styles.errors}>{errors.client}</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.textTitle}>
                        Comment
                      </Text>
                      <TextInput
                        numberOfLines={1}
                        value={values.clientscomment}
                        style={styles.input}
                        placeholder={'client comment'}
                        placeholderTextColor="#1113"
                        onChangeText={handleChange('clientscomment')}
                      />
                      {errors.clientscomment && <Text style={styles.errors}>{errors.clientscomment}</Text>}
                    </View>
                  </List.Accordion>

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
                        value={values.searchDatecomment}
                        style={styles.input}
                        numberOfLines={5}
                        placeholder={'Search Comment'}
                        placeholderTextColor="#1113"
                        onChangeText={handleChange('searchDatecomment')}
                      />
                      {errors.searchDatecomment && <Text style={styles.errors}>{errors.searchDatecomment}</Text>}
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
                        value={values.fullName}
                        style={styles.input}
                        numberOfLines={1}
                        placeholder={'fullName'}
                        placeholderTextColor="#1113"
                        onChangeText={handleChange('fullName')}
                      />
                      {errors.fullName && <Text style={styles.errors}>{errors.fullName}</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.textTitle}>
                        Comment
                      </Text>
                      <TextInput
                        value={values.fullNamecomment}
                        style={styles.input}
                        numberOfLines={5}
                        placeholder={'FullName Comment'}
                        placeholderTextColor="#1113"
                        onChangeText={handleChange('fullNamecomment')}
                      />
                      {errors.fullNamecomment && <Text style={styles.errors}>{errors.fullNamecomment}</Text>}
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
                        value={values.residentialAddress}
                        style={styles.input}
                        placeholder={'residentialAddress'}
                        placeholderTextColor="#1113"
                        onChangeText={handleChange('residentialAddress')}
                      />
                      {errors.residentialAddress && <Text style={styles.errors}>{errors.residentialAddress}</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.textTitle}>
                        Comment
                      </Text>
                      <TextInput
                        numberOfLines={5}
                        value={values.residentialAddresscomment}
                        style={styles.input}
                        placeholder={'Residential Comment'}
                        placeholderTextColor="#1113"
                        onChangeText={handleChange('residentialAddresscomment')}
                      />
                      {errors.residentialAddresscomment && <Text style={styles.errors}>{errors.residentialAddresscomment}</Text>}
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
                        value={values.phoneNo}
                        style={styles.input}
                        placeholder={'phone Number'}
                        placeholderTextColor="#1113"
                        onChangeText={handleChange('phoneNo')}
                      />
                      {errors.phoneNo && <Text style={styles.errors}>{errors.phoneNo}</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.textTitle}>
                        Comment
                      </Text>
                      <TextInput
                        numberOfLines={5}
                        value={values.phoneNocomment}
                        style={styles.input}
                        placeholder={'Phone Number Comment'}
                        placeholderTextColor="#1113"
                        onChangeText={handleChange('phoneNocomment')}
                      />
                      {errors.phoneNocomment && <Text style={styles.errors}>{errors.phoneNocomment}</Text>}
                    </View>

                  </List.Accordion>


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
                        value={values.meansOfId}
                        style={styles.input}
                        // numberOfLines={1}
                        placeholder={'Means Of Identification'}
                        placeholderTextColor="#1113"
                        onChangeText={handleChange('meansOfId')}
                      />
                      {errors.meansOfId && <Text style={styles.errors}>{errors.meansOfId}</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.textTitle}>
                        Comment
                      </Text>
                      <TextInput
                        numberOfLines={5}
                        value={values.meansOfIdcomment}
                        style={styles.input}
                        placeholder={'Means Of Identification Comment'}
                        placeholderTextColor="#1113"
                        onChangeText={handleChange('meansOfIdcomment')}
                      />
                      {errors.meansOfIdcomment && <Text style={styles.errors}>{errors.meansOfIdcomment}</Text>}
                    </View>
                  </List.Accordion>

                  {/* Land Lord Info*/}
                  {name === "Tenant Verification" &&
                    <List.Accordion
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
                        value={values.previousWork}
                        style={styles.input}
                        placeholder={'previous Work'}
                        placeholderTextColor="#1113"
                        onChangeText={handleChange('previousWork')}
                      />
                      {errors.meansOfIdcomment && <Text style={styles.errors}>{errors.meansOfIdcomment}</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.textTitle}>
                        Comment
                      </Text>
                      <TextInput
                        numberOfLines={5}
                        value={values.previousWorkcomment}
                        style={styles.input}
                        placeholder={'previous Work Comment'}
                        placeholderTextColor="#1113"
                        onChangeText={handleChange('previousWorkcomment')}
                      />
                      {errors.previousWorkcomment && <Text style={styles.errors}>{errors.previousWorkcomment}</Text>}
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
                        value={values.observation}
                        style={styles.input}
                        placeholder={'Observation'}
                        placeholderTextColor="#1113"
                        onChangeText={handleChange('observation')}
                      />
                      {errors.observation && <Text style={styles.errors}>{errors.observation}</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.textTitle}>
                        Comment
                      </Text>
                      <TextInput
                        numberOfLines={5}
                        value={values.observationcomment}
                        style={styles.input}
                        placeholder={'Observation comment'}
                        placeholderTextColor="#1113"
                        onChangeText={handleChange('observationcomment')}
                      />
                      {errors.observationcomment && <Text style={styles.errors}>{errors.observationcomment}</Text>}
                    </View>
                  </List.Accordion>

                  {/* Visuals */}
                  <List.Accordion
                    title="Visuals"
                    expanded={expanded13}
                    onPress={handlePress13}>

                    <View style={styles.inputContainer}>
                      <Text style={styles.textTitle}>
                        Visuals description'
                      </Text>
                      <TextInput
                        value={values.visuals}
                        style={styles.input}
                        placeholder={'Visuals description'}
                        placeholderTextColor="#1113"
                        onChangeText={handleChange('visuals')}
                      />
                      {errors.visuals && <Text style={styles.errors}>{errors.visuals}</Text>}
                    </View>

                    <View style={styles.inputContainer}>

                      <Text style={styles.textTitle}>
                        Visuals Image Url
                      </Text>
                      <TextInput
                        numberOfLines={5}
                        value={values.visualsimageUrl}
                        style={styles.input}
                        placeholder={'Visuals image Url'}
                        placeholderTextColor="#1113"
                        onChangeText={handleChange('visualsimageUrl')}
                      // onChangeText={setobservationcomment}
                      />
                      {errors.visualsimageUrl && <Text style={styles.errors}>{errors.visualsimageUrl}</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.textTitle}>

                      </Text>
                      <ImageUpload setPhoto={setPhoto} setvisualsimageUrl={setvisualsimageUrl} />
                    </View>

                  </List.Accordion>


                </List.Section>
                <View style={styles.Submit}>
                  {/* @ts-ignore */}
                  <TouchableOpacity onPress={handleSubmit} style={photo ? styles.buttonContainer1 : styles.buttonContainer} >
                    {Loading ? <MaterialIndicator color='white' size={25} style={styles.loadingIcon} /> : <Text style={styles.buttonText}>Submit</Text>}

                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </ScrollView >
    </View >
  );
};

export default ReportStatus;





const styles = StyleSheet.create({
  errors: { color: "red" },
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
    flex: 1,

  },

  text: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 28,
    marginBottom: 10,
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
