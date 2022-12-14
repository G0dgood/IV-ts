import { StyleSheet, } from 'react-native'
import React from 'react'
import { View, Text } from './Themed';
import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';




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
					{value?.requester?.user?.lastName} {"  "}
					<Text style={styles.ScheduleNameTop2}>
						₦{value?.payment?.amount}
					</Text>
					{"          "}
					<Text  >
						{" "}
						{value?.status === "ONGOING_VERIFICATION" ? 'ONGOING' : value?.status}
					</Text>
				</Text>
				<View style={styles.downNameDate}>
					<Text style={styles.downName}>{value?.service?.description} </Text>
					{""}
					<Text style={styles.downNameSide}>
						{" "}
						{moment(value?.createdAt).format("DD-MMM-YY")}
					</Text>

				</View>
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

export { Card };


const styles = StyleSheet.create({
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
	UpName: {
		fontSize: 12,
		fontFamily: "Poppins_600SemiBold",
	},
	downName: {
		color: "#AAA",
		fontSize: 12,
		fontFamily: "Poppins_400Regular",
	},
	ScheduleNameTop2: {
		fontSize: 10,
		fontFamily: "Poppins_600SemiBold",
		paddingEnd: 10,
		// paddingLeft: 10
		color: "red",
		backgroundColor: "#FEEAEA",
	},
	UpNamedownName: {
		position: "absolute",
		left: 60,
	},
	downNameDate: { flexDirection: "row" },
	downNameSide: {
		color: "#AAA",
		fontSize: 12,
		fontFamily: "Poppins_400Regular",
		marginLeft: 20,
	},
	LatestName: {
		paddingTop: 5,
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

	arrowrightName: {
		color: "#BEC3D5",
	},
})