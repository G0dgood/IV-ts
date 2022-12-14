import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Text, View, } from '../components/Themed';
import { Dimensions } from "react-native";
export const WIDTH2 = Dimensions.get("window").width - 40;
export const arrow2 = Dimensions.get("window").width - 125;
import { ProgressBar } from 'react-native-paper';
import { useAppSelector } from "../hooks/useStore";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/TaskCard";
export const SLIDER_WIDTH = Dimensions.get("window").width - 80;
export const SLIDER_WIDTH2 = Dimensions.get("window").width - 250;
export const button = Dimensions.get("window").width - 300;
export const Height1 = Dimensions.get("window").height - 470;
export const Height2 = Dimensions.get("window").height - 330;

const Schedule = ({ navigation }: any) => {
  const route = useRoute();
  // @ts-ignore
  // const { id } = route.params;

  const { data, isLoading } = useAppSelector((state) => state.verify);



  const [isModalVisible, setModalVisible] = useState(false);

  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);
  // };
  // const toggleModalClose = () => {
  //   setModalVisible(isModalVisible);
  // };
  const handlesDetailsPage = () => {
    navigation.navigate("DetailsPage")
  }
  // , { id }
  // @ts-ignore
  const datas = data?.data?.filter((obj) => {
    return obj?.status !== "COMPLETED";
  })
  const Schedule = datas?.filter((obj: any) => {
    return obj?.service?.category !== "CERTIFICATE";
  })


  return (
    <View style={styles.ScheduleContainer} lightColor="#fff" darkColor="#000">
      {isLoading && <ProgressBar progress={0.3} color={'#007AFF'} indeterminate={isLoading} />}

      <ScrollView style={styles.ScheduleScrollView}>
        {/* @ts-ignore */}
        {Schedule === undefined ? <View style={styles.mainEmoji}>
          <Ionicons
            name="ios-folder-open-outline"
            size={120}
            color="#D9E8FD"
          />
          <View>
            <Text style={styles.ticket}>No Data Found!</Text>
          </View>
        </View> : Schedule?.map((item: any, index: any) => {
          return (
            // @ts-ignore
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("DetailsPage", {
                  Id: item?.payment?.requestId,
                  requestId: item?.id,
                  name: item?.service?.description,
                  category: item?.service?.category,
                  clientinfo: item,
                })
              }>
              <Card key={index} value={item} />
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  ticket: {
    color: "#007AFF",
    fontFamily: "Poppins_600SemiBold",
  },

  mainEmoji: {
    margin: 100,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
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


  ScheduleButton2: {
    width: Platform.OS === "android" ? 90 : button,
    height: 40,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  ScheduleButton1: {
    width: Platform.OS === "android" ? 90 : button,
    height: 40,
    backgroundColor: "#CB0404",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    marginRight: 40,
  },

  idcard: {
    color: "#0D8B8B",
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

  ScheduleArrowright: {
    color: "#B1B5C5",
  },

  ScheduleTextAlign: {
    textAlign: "center",
    color: "#0D8B8B",
  },
  ScheduleTextAlign2: {
    textAlign: "center",
    color: "#007AFF",
  },

  ScheduleScrollView: {
    marginTop: 20,
  },

  ScheduleNameTop2: {
    fontSize: 10,
    fontFamily: "Poppins_600SemiBold",
    paddingEnd: 10,
    // paddingLeft: 10
    color: "red",
    backgroundColor: "#FEEAEA",
  },
  ScheduleNameTop: {
    fontSize: 11,
    fontFamily: "Poppins_600SemiBold",
    paddingRight: 5,
  },

  ScheduleNameBottom: {
    color: "#BEC3D5",
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },

  ScheduleNameArrow: {
    position: "absolute",
    left: arrow2,
    marginTop: 4,
  },

  viewIcon: {
    backgroundColor: "#D9FDFB",
    height: 30,
    width: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  viewIcon2: {
    backgroundColor: "#D9E8FD",
    height: 30,
    width: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  viewIcon3: {
    backgroundColor: "#FEEAEA",
    height: 30,
    width: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  viewIcon4: {
    backgroundColor: "#F1D9FD",
    height: 30,
    width: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },



  ScheduleNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  ScheduleView: {
    height: 42,
    borderColor: "#aaa",
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    width: WIDTH2,
  },

  ScheduleContainer: {
    flex: 1,
    // backgroundColor: "red",
  },
});
