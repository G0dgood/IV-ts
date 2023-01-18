import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Platform,
} from "react-native";
import { Text, View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
import { Badge } from "react-native-elements";
import BannerSlider from "./BannerSlider";
import { useAppSelector, useAppDispatch } from "../hooks/useStore";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { allassignedrequest, reset } from "../features/verifySlice";
import * as Haptics from "expo-haptics";
import Skeleton from "../components/LoaderSkeleton";
import { setUserInfo } from "../features/authSlice";
import { Card } from "../components/TaskCard";

const wait = (timeout: number | undefined) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const Home = () => {
  const { user, isSuccess } = useAppSelector((state) => state.auth);
  const {
    data: datav,
    isSuccess: success,
    isLoading,
    message,
    error
  } = useAppSelector((state) => state.verify);

  // console.log('message', message, 'datav', datav)

  const [refreshing, setRefreshing] = React.useState(false);

  const dispatch = useAppDispatch();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // console.log("Home", message);

  React.useEffect(() => {
    userInfo();
  }, [isSuccess]);

  const userInfo = async () => {
    try {
      const info = await AsyncStorage.getItem("user");
      // @ts-ignore
      dispatch(setUserInfo(info));
    } catch (e) {
      console.log(`isLoggedIn in error ${e}`);
    }
  };

  const navigation = useNavigation();
  const [datas, setdatas] = useState([]);
  const [isError, setisError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [greet, setGreet] = useState("");

  useEffect(() => {
    dispatch(allassignedrequest(user));
  }, [user, refreshing]);

  useEffect(() => {
    if (datav) {
      try {
        setdatas(datav);
      } catch (err) {
        console.log(err);
      }
    }
  }, [datav]);
  // @ts-ignore
  const data = datas?.data?.filter((obj: { service: { category: string; }; }) => {
    return obj?.service?.category !== "CERTIFICATE";
  });

  // useEffect(() => {
  //   if (message === "Unauthorized") {
  //     // @ts-ignore
  //     setTimeout(() => {
  //       dispatch(
  //         logoutUser(),
  //         // @ts-ignore  
  //         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  //       );
  //     }, 1000);
  //     dispatch(reset());
  //   }
  // }, [dispatch, message, navigation]);

  // useEffect(() => {
  //   dispatch(reset());
  //   console.log("worked...");
  // }, [message, navigation, dispatch]);

  useEffect(() => {
    if (isError === true) {
      Alert.alert("Hello!", message, [{ text: "OK" }]);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
    setTimeout(() => {
      setisError(false);
    }, 2000);
    setTimeout(() => {
      dispatch(reset());
    }, 5000);
  }, []);

  useEffect(() => {
    getHour();
  }, [isSuccess]);



  // // @ts-ignore
  const COMPLETED = data?.filter((obj: { status: string; }) => {
    return obj?.status === "COMPLETED";
  });
  // // @ts-ignore
  const ONGOING = data?.filter((obj: { status: string; }) => {
    return obj?.status === "ONGOING_VERIFICATION";
  });
  // // @ts-ignore
  const CANCELLED = data?.filter((obj: { status: string; }) => {
    return obj?.status === "CANCELLED";
  });
  // // @ts-ignore
  const REJECTED = data?.filter((obj: { status: string; }) => {
    return obj?.status === "REJECTED";
  });
  // // @ts-ignore
  const pending = data?.filter((obj: { status: string; }) => {
    return obj?.status !== "COMPLETED";
  });

  const Schedule = data?.filter((obj: { status: string; }) => {
    return obj?.status !== "COMPLETED";
  });

  const getHour = () => {
    const date = new Date();
    const hour = date.getHours();

    if (hour < 12) setGreet("GOOD MORNING");
    else if (hour >= 12 && hour <= 17) setGreet("GOOD AFTERNOON");
    else if (hour >= 17 && hour <= 24) setGreet("GOOD EVENING");
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainScroll}>
        <View>
          <Text style={styles.morning}>{greet}</Text>
          {/* @ts-ignore */}
          <Text style={styles.UserName}>{user?.displayName}</Text>
        </View>

        <BannerSlider
          loading={loading}
          count={data?.length}
          completed={COMPLETED?.length}
          ongoing={ONGOING?.length}
          canclled={CANCELLED?.length}
          rejected={REJECTED?.length}
          pending={pending?.length}
        />
      </View>
      <TouchableOpacity
        style={styles.Badge}
        onPress={() => navigation.navigate("Schedule")}>
        <Text style={styles.schedule}>New verification schedule </Text>
        <Badge value={!Schedule ? 0 : Schedule?.length} status="warning" />
      </TouchableOpacity>
      <View style={styles.verifications}>

      </View>
      {/* Address Section */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {isLoading ? (
          <Skeleton />
        ) : (
          <View>
            {!datav ? (
              <View style={styles.mainEmoji}>
                <Ionicons
                  name="ios-folder-open-outline"
                  size={120}
                  color="#D9E8FD"
                />
                <View>
                  <Text style={styles.ticket}>No Data Found!</Text>
                </View>
              </View>
            ) : (
              data?.map((item: { payment: { requestId: any; }; id: any; service: { description: any; category: any; }; }, index: React.Key | null | undefined) => {
                return (
                  // @ts-ignore
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      // @ts-ignore
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
                );
              })
            )}
          </View>
        )}
      </ScrollView>
      {/* <Footer /> */}
    </View>
  );
};

export default Home;

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
  schedule1: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },

  // ViewLast: {
  //   marginBottom: 50,
  // },

  verifications: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },

  schedule: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    alignItems: "center",
    color: "#000",
  },

  arrowright: {
    color: "#007AFF",
  },
  Viewall: {
    color: "#007AFF",
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
  },
  keyboardarrow: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  Badge: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginTop: 5,
    backgroundColor: "#FEEAEA",
    borderRadius: 5,
    marginLeft: 16,
    marginRight: 16,
    fontSize: 20,
    fontWeight: "bold",
  },

  UserName: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Poppins_600SemiBold",
  },

  morning: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },

  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 35 : 10,
  },

  mainScroll: {
    padding: 10,
    maxHeight: 230,
  },
});
