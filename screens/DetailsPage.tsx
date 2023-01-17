import { TouchableOpacity, ScrollView, StyleSheet, Platform, Alert, TextInput, Appearance } from 'react-native'
import React, { useEffect, useState } from 'react'
import { View, Text } from '../components/Themed'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../hooks/useStore'
import { ProgressBar } from 'react-native-paper'
import * as Haptics from "expo-haptics";
import { baseUrl } from '../shared/baseUrl'
import { Ionicons } from '@expo/vector-icons'
import { BarIndicator } from 'react-native-indicators'
import { logoutUser, reset } from '../features/authSlice'



const DetailsPage = ({ navigation }: any) => {

	const { user } = useAppSelector((state: { auth: any; }) => state.auth)
	const route = useRoute();
	// @ts-ignore
	const { name, requestId, category, Id } = route.params;
	const colorScheme = Appearance.getColorScheme();

	const dispatch = useAppDispatch();

	const [data, setdata] = useState<any>([]);
	const [data1, setdata1] = useState<any>([]);
	const [data2, setdata2] = useState<any>([]);
	const [datax, setdatax] = useState<any>([]);
	const [isError, setisError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [items1, setItems1] = useState([]);
	const [items2, setItems2] = useState([]);
	const [items3, setItems3] = useState([]);
	const [messages, setMessages] = useState("");
	const [requestItemId, setrequestItemId] = useState("");




	React.useEffect(() => {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user?.idToken}`,
			},
		};

		setLoading(true);
		axios
			.get(baseUrl + `/requests/details/${Id}`, config)
			.then((res) => {
				setdata(res?.data);
				// console.log("DetailsPage", res.data);
				setLoading(false);
			})
			.catch((err) => {
				// console.log('err', err);
				setMessages(err?.message);
				setLoading(false);
				setisError(true);
			});
	}, [user?.idToken,]);




	useEffect(() => {
		if (messages === "401") {
			// @ts-ignore
			dispatch(
				logoutUser(),
				// @ts-ignore
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
			);
			dispatch(reset());
		}
	}, [dispatch, messages, navigation]);


	useEffect(() => {
		if (isError === true) {
			Alert.alert("Hello!", messages, [{ text: "OK" }]);
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
		}
		setTimeout(() => {
			setisError(false);
		}, 2000);
		setTimeout(() => {
			setMessages("");
		}, 5000);
	}, []);



	useEffect(() => {
		if (data) {
			try {
				setdatax(data?.employees);
			} catch (err) {
				console.log(err);
			}
		}
	}, [data]);

	useEffect(() => {
		if (data) {
			try {
				setdata1(data?.tenants);
			} catch (err) {
				console.log(err);
			}
		}
	}, [data]);




	useEffect(() => {
		if (data) {
			try {
				setdata2(data?.certificates);
			} catch (err) {
				console.log(err);
			}
		}
	}, [data]);

	useEffect(() => {
		if (datax) {
			try {
				setItems1(datax);
				setrequestItemId(datax[0]?.id);
			} catch (err) {
				console.log(err);
			}
		} else if (data1) {
			try {
				setItems2(data1);
				setrequestItemId(data1[0]?.id);
			} catch (err) {
				console.log(err);
			}
		} else if (data2) {
			try {
				setItems3(data2);
				setrequestItemId(data2[0]?.id);
			} catch (err) {
				console.log(err);
			}
		}
	}, [datax, data1, data2]);





	const MultiText = (props: any) => {
		return (
			<View>
				<TextInput
					{...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
					editable={false}
					maxLength={200}
				/>
			</View>
		);
	}



	if (!data) {
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
		return <View style={styles.container}>

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
		</View>
	}

	const Card1 = ({ value, index }: any) => {
		return (
			<View style={styles.PersonalInformationView} key={index}>
				<View style={styles.modalTextInput}>
					<View>
						<View style={styles.modalTextInputCOl}>
							<View style={styles.modalTextInputMargin}>
								<Text style={styles.infoInputColorheader}>BIO DATA:</Text>
							</View>
						</View>
						<View style={styles.modalTextInputCOl}>
							<View>
								<Text style={styles.infoInputColor}>Full Name:</Text>
							</View>
							<View>
								<Text style={styles.infoInputColor}>
									{value?.fullName}
								</Text>
							</View>
						</View>
						<View style={styles.modalTextInputCOl}>
							<View>
								<Text style={styles.infoInputColor}>Phone No:</Text>
							</View>
							<View>
								<Text style={styles.infoInputColor}>
									{value?.phoneNo === null ? "N/A" : value?.phoneNo}
								</Text>
							</View>
						</View>
					</View>
					<View style={styles.modalTextInputCOl}>
						<View>
							<Text style={styles.infoInputColor}>National Identity Number (NIN):</Text>
						</View>
						<View>
							<Text style={styles.infoInputColor}>
								{value?.idType === null ? "N/A" : value?.idType}
							</Text>
						</View>
					</View>

					<View style={styles.modalTextup}>
						<View style={styles.modalTextInputMargin}>
							<Text style={styles.infoInputColorheader}>ADDRESS:</Text>
						</View>
					</View>
					<View>
						<MultiText
							multiline
							// numberOfLines={10}
							value={value?.residentialAddress}
							style={[styles.TextInput, colorScheme === 'dark'
								?
								{ color: "#fff" }
								: { color: "#000" }]}
						/>
					</View>


				</View>
			</View>
		);
	};


	return (
		<View style={styles.container}>
			{loading && <ProgressBar progress={0.3} color={'#007AFF'} indeterminate={loading} />}
			{loading ? < BarIndicator color='#007AFF' size={30} style={styles.loading} /> : <View style={styles.pdetailsContainer} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">

				<View style={styles.generaldetailsContainer}>

					<View style={styles.generaldetail}  >
						{!datax ? '' : datax?.map((item: any, index: any) => (
							<View key={index} style={styles.generaldetailsub} >
								<Text style={styles.pldetailsTitle}>{item?.fullName}</Text>
								<View style={styles.detailsubstatus}>
									<Text style={styles.pldetailsTitle2}>{item?.status}</Text>
								</View>
							</View>

						))}
						{!data1 ? '' : data1?.map((item: any, index: any) => (
							<View key={index} style={styles.generaldetailsub} >
								<Text style={styles.pldetailsTitle}>{item?.fullName}</Text>
								<Text style={styles.pldetailsTitle2}>{item?.status}</Text>
							</View>
						))}
						{!data2 ? '' : data2?.map((item: any, index: any) => (
							<View key={index} style={styles.generaldetailsub}>
								<Text style={styles.pldetailsTitle}>{item?.fullName}</Text>
								<Text style={styles.pldetailsTitle2}>{item?.status}</Text>
							</View>
						))}
					</View>
				</View>
				<ScrollView
					style={[{ paddingBottom: 80 }]}
					showsVerticalScrollIndicator={false}>
					<View>
						<View style={styles.containerAccount} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" >
							<Text style={styles.containerTitle} >REQUEST DETAILS</Text>
						</View>


						{!datax ? '' : datax?.map((item: any, index: any) => (
							<Card1 key={index} value={item} />
						))}
						{!data1 ? '' : data1?.map((item: any, index: any) => (
							<Card1 key={index} value={item} />
						))}
						{!data2 ? '' : data2?.map((item: any, index: any) => (
							<Card1 key={index} value={item} />
						))}

					</View>
					<TouchableOpacity style={[styles.introNextTouch]} onPress={() =>
						navigation.navigate("ReportStatus", {
							screen: "ReportStatus",
							name: name,
							requestId: requestId,
							category: category,
							requestItemId: requestItemId,
							Employee: items1,
							Certificate: items3,
							Tenant: items2,
						})
					}	>

						<Text style={styles.introNext}>Add Comment</Text>
					</TouchableOpacity>
				</ScrollView >
			</View >}

		</View >
	)
}

export default DetailsPage


const styles = StyleSheet.create({
	userIcon1: {
		color: '#007AFF',
		// flexDirection: 'row',
		// justifyContent: 'center',
		// alignItems: 'center'
	},
	detailsubstatus: {
		backgroundColor: "green",
		padding: 6,
		borderRadius: 5,
	},
	generaldetailsub: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: "100%",
	},

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
	image: {
		width: "100%",
		height: "100%",
		resizeMode: 'cover',
	},

	modalTextupImage: {
		width: "100%",
		height: 280,
		marginTop: 20,
		marginBottom: 20,
		borderColor: '#007AFF',
		borderWidth: 1,
		borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalTextup: {
		marginTop: 20,
	},
	TextInput: {
		padding: 10,
		paddingTop: 10,
		borderColor: '#007AFF',
		borderWidth: 1,
		borderRadius: 5,

	},
	introNext: {
		textAlign: "center",
		fontFamily: 'Poppins_700Bold',
		color: "#fff",
		borderRadius: 5,
		fontWeight: "700",
		flexDirection: "row",
	},

	introNextTouch: {
		justifyContent: "center",
		borderRadius: 20,
		backgroundColor: "#007AFF",
		marginTop: Platform.OS === "ios" ? 30 : 30,
		fontFamily: 'Poppins_500Medium',
		padding: 10

	},

	loading: {
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},

	container: {
		flex: 1,
	},

	modalTextInputMargin: {
		paddingRight: '10%',

	},

	PersonalInformationView: {
		marginRight: 20,
		marginLeft: 20,
		paddingBottom: 20
	},

	modalTextInput: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		borderRadius: 10
	},

	modalTextInputCOl: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: Platform.OS === 'android' ? 12 : 20,

		borderBottomColor: '#BEC3D5',
		borderBottomWidth: 1
	},
	modalTextInputCONext: {
		flexDirection: 'column',
		// justifyContent: 'space-between',
		paddingTop: Platform.OS === 'android' ? 12 : 20,

		borderBottomColor: '#BEC3D5',
		borderBottomWidth: 1
	},

	infoInputColor: {
		fontSize: 14,
		fontFamily: 'Poppins_400Regular',
	},
	infoInputColorbg: {
		fontSize: 14,
		fontFamily: 'Poppins_400Regular',
		backgroundColor: "rgb(243, 240, 255)",
		padding: 5,
	},
	infoInputColorbc: {
		fontSize: 14,
		fontFamily: 'Poppins_600SemiBold',
		color: 'rgb(132, 94, 247)',
		fontWeight: "bold"
	},
	infoInputColorheader: {
		fontSize: 14,
		fontFamily: 'Poppins_600SemiBold',
		color: "#007AFF",

	},
	AccountDetailsflex: {
		flexDirection: "row",
		justifyContent: 'space-between',
	},

	buttom: {
		borderRadius: 4,
		marginTop: 25,
		height: 10,
	},
	buttomText: {
		padding: 10,
		textAlign: 'center',
		color: "#fff",
	},
	containerAccount: {
		paddingTop: 20,
		paddingLeft: 20,
		paddingBottom: 10,
	},
	containerAccount1: {
		padding: 20,
		borderBottomColor: "#D1D1D1",
		borderBottomWidth: 1,


	},
	AccountDetails: { flexDirection: "row", borderRadius: 20, justifyContent: 'space-between' },
	AccountDetailsText: { paddingLeft: 18 },
	PoppinsText: { fontFamily: 'Poppins_400Regular' },

	containerTitle: {
		fontSize: 13,
		fontFamily: 'Poppins_700Bold',
		fontWeight: 'bold',
	},

	details3: {
		color: "#aa4b18",
		fontWeight: 'bold',
	},
	details1: {
		fontFamily: "Poppins_400Regular",
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	details2: {
		fontFamily: "Poppins_400Regular",
		fontWeight: "bold",
	},

	detailsMargin: {
		margin: 20,
	},
	proJecAdd: {
		color: "#000"
	},
	proJectButtons: {
		marginRight: 5,
		borderWidth: 2,
		paddingHorizontal: 20,
		paddingTop: 10,
		paddingBottom: 20,
		marginVertical: 5,
		borderRadius: 5,
		borderColor: "#aa4b18",
		color: "#aa4b18",
		fontFamily: "Poppins_700Bold"
	},
	pldetailsTitleSub: {
		flexDirection: 'column',
		justifyContent: 'center',
		width: 150,
		height: 40,
		borderRadius: 5,
		alignItems: 'center',
		backgroundColor: '#007AFF'
	},

	pldetailsTitlestyle: {
		color: "#fff",
		fontWeight: 'bold',
		fontFamily: "Poppins_600SemiBold",
	},

	generaldetailsContainer: {
		fontFamily: "Poppins_400Regular",
		// marginLeft: 20,
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 5,
		width: "100%",
		borderRadius: 20,
	},

	pldetailsTitle: {
		fontFamily: "Poppins_400Regular",
		fontSize: 16,
	},
	pldetailsTitle2: {
		fontFamily: "Poppins_400Regular",
		fontSize: 16,
		color: '#fff'
	},


	generaldetail: {
		width: "100%",
		height: 50,
		borderRadius: 10,
		// marginBottom: 10,
		flexDirection: "row",
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	pdetailsContainer: {
		flex: 1,
		padding: 10,
	},
	generaldetails: {
		width: "100%",
		height: 100,
		borderRadius: 10,
		marginBottom: 10,
	}

})