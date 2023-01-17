import React, { useState } from "react";
import {
   StyleSheet,
   SafeAreaView,
   TextInput,
   ScrollView,
   TouchableOpacity,
   Alert,
   Platform,
} from "react-native";
import { Text, View, } from '../components/Themed';
import { Dimensions } from "react-native";
import ButtonToggleGroup from "react-native-button-toggle-group";
import Modal from "react-native-modal";
export const SLIDER_WIDTH = Dimensions.get("window").width - 80;
export const WIDTH = Dimensions.get("window").width - 40;
export const arrow = Dimensions.get("window").width - 125;
import Checkbox from "expo-checkbox";
import { useAppSelector } from "../hooks/useStore";
import { ProgressBar } from "react-native-paper";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";

const Reports = ({ navigation }: any) => {

   const { data, isLoading, } = useAppSelector((state) => state.verify);

   const [value, setValue] = React.useState("Employee");
   const [isModalVisible, setModalVisible] = useState(false);

   const [isChecked1, setChecked1] = useState(false);
   const [isChecked2, setChecked2] = useState(false);
   const [isChecked3, setChecked3] = useState(false);

   const toggleModal = () => {
      setModalVisible(!isModalVisible);
   };
   // @ts-ignore
   const datas = data?.data?.filter((obj: any) => {
      return obj?.service?.category !== "CERTIFICATE";
   });
   // @ts-ignore
   const info = datas?.filter((obj) => {
      return obj?.service?.category?.toLowerCase() === value.toLowerCase();
   });





   const Card = ({ value }: any) => {
      return (
         <View style={styles.LatestView}>
            <View
               style={
                  value?.service?.category === "EMPLOYEE"
                     ? styles.viewIcon
                     : value?.service?.category === "TENANT"
                        ? styles.viewIcon2
                        : styles.viewIcon3
               }>
               <Text>
                  {value?.service?.category === "EMPLOYEE" ? (
                     <AntDesign style={styles.idcard} name="idcard" size={12} />
                  ) : value?.service?.category === "TENANT" ? (
                     <Entypo style={styles.idcard2} name="location" size={12} />
                  ) : (
                     value?.service?.category === "CERTIFICATE" && (
                        <Ionicons style={styles.idcard3} name="business" size={12} />
                     )
                  )}
               </Text>
            </View>
            <View style={styles.UpNamedownName}>
               <Text style={styles.UpName}>
                  {value?.requester?.user?.firstName}{" "}
                  {value?.requester?.user?.lastName} {" "}
                  <Text style={styles.ScheduleNameTop2}>
                     ₦{value?.payment?.amount}
                  </Text>
               </Text>

               <Text style={styles.downName}>{value?.service?.description} </Text>
            </View>
            <View>
               <Text style={styles.LatestName}>
                  <MaterialIcons
                     style={styles.arrowrightName}
                     name="keyboard-arrow-right"
                     size={20}
                  />
               </Text>
            </View>
         </View>
      );
   };
   return (
      <View style={styles.ReportsContainer} lightColor="#fff" darkColor="#000">
         {isLoading && <ProgressBar progress={0.3} color={'#007AFF'} indeterminate={isLoading} />}
         <View>
            <View style={styles.ButtonToggle}>
               {/* @ts-ignore */}
               <ButtonToggleGroup
                  highlightBackgroundColor={"#fff"}
                  highlightTextColor={"#007AFF"}
                  // inactiveBackgroundColor={'#aaa'}
                  style={styles.Toggle}
                  inactiveTextColor={"#BEC3D5"}
                  values={["Employee", "Tenant"]}
                  value={value}
                  onSelect={(val) => setValue(val)}
               />
            </View>
            <View style={styles.FiterToggle}>
               <View style={styles.FiterToggleSearch}>
                  <TextInput
                     placeholder="Search here "
                     placeholderTextColor="#BEC3D5"
                     style={styles.Fiterinput}
                  />
                  <Ionicons style={styles.FiterSearchIcon} name="search" size={20} />
               </View>
               <View style={styles.SearchIconBtn}>
                  <TouchableOpacity onPress={toggleModal}>
                     <Ionicons style={styles.FiterBtnIcon} name="filter" size={25} />
                  </TouchableOpacity>
               </View>
            </View>
            <ScrollView style={styles.FiterScrollView}>

               {/* <!-- Table starts here --> */}
               {value === "Employee" && (
                  <View>
                     {info === undefined ?
                        <View style={styles.mainEmoji}>
                           <Ionicons
                              name="ios-folder-open-outline"
                              size={120}
                              color="#D9E8FD"
                           />
                           <View>
                              <Text style={styles.ticket}>No Data Found!</Text>
                           </View>
                        </View> : info?.map((item: any, index: any) => (
                           <TouchableOpacity
                              key={index}

                              onPress={() => navigation.navigate("DetailsPage", {
                                 Id: item?.payment?.requestId,
                                 requestId: item?.id,
                                 name: item?.service?.description,
                                 category: item?.service?.category,
                                 clientinfo: item,
                              })}
                           >
                              <Card key={index} value={item} />
                           </TouchableOpacity>
                        ))
                     }
                  </View>
               )}



               {value === "Tenant" && (
                  <View>
                     {info === undefined ?
                        <View style={styles.mainEmoji}>
                           <Ionicons
                              name="ios-folder-open-outline"
                              size={120}
                              color="#D9E8FD"
                           />
                           <View>
                              <Text style={styles.ticket}>No Data Found!</Text>
                           </View>
                        </View> : info?.map((item: any, index: any) => (
                           <TouchableOpacity
                              key={index}
                              onPress={() => navigation.navigate("DetailsPage", {
                                 Id: item?.payment?.requestId,
                                 requestId: item?.id,
                                 name: item?.service?.description,
                                 category: item?.service?.category,
                                 requestItemId: item?.service?.id,
                                 clientinfo: item,
                              })}>
                              <Card key={index} value={item} />
                           </TouchableOpacity>
                        ))
                     }
                  </View>
               )}
               {/* {value === "Certificate" && (
      <View>
       {info === undefined ?
        <View style={styles.mainEmoji}>
         <Ionicons
          name="ios-folder-open-outline"
          size={120}
          color="#D9E8FD"
         />
         <View>
          <Text style={styles.ticket}>No Data Found!</Text>
         </View>
        </View> : info?.map((item: any, index: any) => (
         <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate("DetailsPage", {
           Id: item?.payment?.requestId,
           requestId: item?.id,
           name: item?.service?.description,
           category: item?.service?.category,
           requestItemId: item?.service?.id,
           clientinfo: item,
          })}
         >
          <Card key={index} value={item} />
         </TouchableOpacity>
        ))
       }
      </View>
     )} */}

            </ScrollView>
         </View >
         <View style={styles.centeredView}>
            <Modal
               isVisible={isModalVisible}
               onBackdropPress={() => setModalVisible(false)}
               style={{ flex: 1 }}>
               <View style={styles.modalView}>
                  <Text style={styles.modalText}>FILTER REPORTS</Text>
                  <View style={styles.modalTextInput}>
                     <View style={styles.modalTextInputCOl}>
                        <View style={styles.modalTextInputMargin} >
                           <Text style={styles.modalInputColor}>Approved</Text>
                        </View>
                        <View>
                           <Text style={styles.modalViewColor}>
                              <Checkbox
                                 style={styles.checkbox}
                                 value={isChecked1}
                                 onValueChange={setChecked1}
                                 color={isChecked1 ? "#007AFF" : undefined}
                              />
                           </Text>
                        </View>
                     </View>
                     <View style={styles.modalTextInputCOl}>
                        <View style={styles.modalViewColor}>
                           <Text style={styles.modalInputColor}>Pending</Text>
                        </View>
                        <View>
                           <Text style={styles.modalViewColor}>
                              <Checkbox
                                 style={styles.checkbox}
                                 value={isChecked2}
                                 onValueChange={setChecked2}
                                 color={isChecked2 ? "#007AFF" : undefined}
                              />
                           </Text>
                        </View>
                     </View>
                     <View style={styles.modalTextInputCOl}>
                        <View style={styles.modalViewColor}>
                           <Text style={styles.modalInputColor}>Disapproved</Text>
                        </View>
                        <View>
                           <Text style={styles.modalViewColor}>
                              <Checkbox
                                 style={styles.checkbox}
                                 value={isChecked3}
                                 onValueChange={setChecked3}
                                 color={isChecked3 ? "#007AFF" : undefined}
                              />
                           </Text>
                        </View>
                     </View>
                  </View>
                  <TouchableOpacity
                     style={styles.modalButton}
                     onPress={() =>
                        Alert.alert("Button with adjusted color pressed")
                     }>
                     <Text style={styles.modalButtonColor}>APPLY FILTER</Text>
                  </TouchableOpacity>
               </View>
            </Modal>
         </View>
      </View >
   );
};

export default Reports;

const styles = StyleSheet.create({
   ticket: {
      color: "#007AFF",
      fontFamily: "Poppins_600SemiBold",
   },
   ScheduleNameTop2: {
      fontSize: 10,
      fontFamily: "Poppins_600SemiBold",
      paddingEnd: 10,
      // paddingLeft: 10
      color: "red",
      backgroundColor: "#FEEAEA",
   },
   modalViewColor: {
      backgroundColor: '#fff'
   },

   LatestName: {
      paddingTop: 5,
   },
   arrowrightName: {
      color: "#BEC3D5",
   },
   LatestView: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginLeft: 18,
      marginRight: 18,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#BEC3D5",
      padding: 5,
      alignItems: "center",
      marginBottom: 18,
   },
   UpName: {
      fontSize: 12,
      fontFamily: "Poppins_600SemiBold",
   },
   UpNamedownName: {
      position: "absolute",
      left: 60,
   },
   downName: {
      color: "#AAA",
      fontSize: 12,
      fontFamily: "Poppins_400Regular",
   },
   idcard: {
      color: "#0D8B8B",
   },
   idcard2: {
      color: "#51A3FF",
   },
   idcard3: {
      color: "#FD937C",
   },
   idcard4: {
      color: "#D777FB",
   },
   viewIcon: {
      backgroundColor: "#D9FDFB",
      padding: 12,
      borderRadius: 25,
      marginLeft: 5,
   },

   viewIcon2: {
      backgroundColor: "#D9E8FD",
      padding: 12,
      borderRadius: 25,
      marginLeft: 5,
   },

   viewIcon3: {
      backgroundColor: "#FEEAEA",
      padding: 12,
      borderRadius: 25,
      marginLeft: 5,
   },

   viewIcon4: {
      backgroundColor: "#F1D9FD",
      padding: 12,
      borderRadius: 25,
      marginLeft: 5,
   },
   mainEmoji: {
      margin: 100,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
   },
   Toggle: {
      // shadowOffset: 'red'
   },

   checkbox: {
      borderRadius: 10,
      color: "red",
   },
   modalCheck: {
      position: "absolute",
      margin: 0,
      padding: 0,
   },
   modalButtonColor: {
      color: "#fff",
      fontFamily: "Poppins_400Regular",
   },

   modalButton: {
      width: 181,
      height: 39,
      backgroundColor: "#007AFF",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 30,
      borderRadius: 5,
   },

   modalInputColor: {
      color: "#20549D",
      fontFamily: "Poppins_400Regular",
   },
   modalTextInputMargin: {
      paddingRight: "50%",
      backgroundColor: '#fff'
   },

   modalTextInputCOl: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 25,
      alignItems: "flex-end",
      borderBottomColor: "#BEC3D5",
      borderBottomWidth: 1,
      backgroundColor: '#fff'
   },

   modalTextInput: {
      flexDirection: "column",
      justifyContent: "space-between",

   },

   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
   },

   modalView: {
      width: SLIDER_WIDTH,
      height: 314,
      margin: 20,
      backgroundColor: '#fff',
      borderRadius: 20,
      paddingTop: 30,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,

   },
   button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
   },
   buttonOpen: {
      backgroundColor: "#F194FF",
   },
   buttonClose: {
      backgroundColor: "#2196F3",

      justifyContent: "flex-start",
   },
   textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
   },
   modalText: {
      textAlign: "center",
      backgroundColor: "#F7F8FA",
      padding: 10,
      width: "100%",
      color: "#9CA5C5",
      fontSize: 16,
      fontFamily: "Poppins_600SemiBold",
   },

   TenantIcon: {
      color: "#007AFF",
   },
   PwaIcon: {
      color: "#FC5E3B",
   },
   GuarantorIcon: {
      color: "#DD40BA",
   },
   EmployeeIcon: {
      color: "#0D8B8B",
   },

   FiterScrollView: {
      height: "100%",
   },

   FiterArrowright: {
      color: "#B1B5C5",
      alignItems: "center",
   },

   FiterNameArrow: {
      position: "absolute",
      left: arrow,
      marginTop: Platform.OS === "android" ? 7 : 4,
   },

   FiterNameBottom: {
      color: "#BEC3D5",
      fontSize: 12,
      fontFamily: "Poppins_400Regular",
   },

   FiterNameTop: {
      fontSize: 11,
      fontFamily: "Poppins_600SemiBold",
      marginRight: "5%",
   },

   FiterNameContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
   },

   FiterTextAlign2: {
      textAlign: "center",
      color: "#007AFF",
   },

   FiterNameUp4: {
      height: 30,
      width: 30,
      backgroundColor: "#D9E8FD",
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      margin: 10,
   },
   FiterNameUp3: {
      height: 30,
      width: 30,
      backgroundColor: "#FEEAEA",
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      margin: 10,
   },

   FiterNameUp2: {
      height: 30,
      width: 30,
      backgroundColor: "#F1D9FD",
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      margin: 10,
   },

   FiterNameUp: {
      height: 30,
      width: 30,
      backgroundColor: "#D9FDFB",
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      margin: 10,
   },

   FiterView: {
      height: 42,
      borderColor: "#aaa",
      borderWidth: 1,
      alignSelf: "center",
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
      width: WIDTH,
   },

   FiterBtnIcon: {
      color: "#fff",
   },

   SearchIconBtn: {
      width: "12%",
      height: 40,
      backgroundColor: "#007AFF",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
   },

   FiterSearchIcon: {
      color: "#BEC3D5",
   },

   Fiterinput: {
      color: "#000",
      flex: 1,
      fontFamily: "Poppins_400Regular",
   },
   FiterToggleSearch: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderColor: "#aaa",
      backgroundColor: "#F6F6F6",
      width: "85%",
      height: 40,
      borderRadius: 5,
      alignItems: "center",
      padding: 8,
      borderWidth: 0.5,
   },

   FiterToggle: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginRight: 20,
      marginLeft: 20,
      marginBottom: 30,
   },

   ButtonToggle: {
      marginRight: 20,
      marginLeft: 20,
      backgroundColor: "#F6F6F6",
      padding: 2,
      borderRadius: 6,
      borderColor: "#aaa",
      marginBottom: 30,
      borderWidth: 0.5,
      marginTop: 30
   },

   ReportsContainer: {
      flex: 1,
      // backgroundColor: "#fff",
   },
});
