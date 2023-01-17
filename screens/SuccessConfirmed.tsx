import { TouchableOpacity, StyleSheet, Dimensions, Platform, Linking, Alert } from 'react-native'
import React from 'react'
import { Text, View, } from '../components/Themed'
import { Octicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Haptics from 'expo-haptics';
export const Select = Dimensions.get('window').width - 40 * 2
const windowHeight = Dimensions.get('window').width;
const COLORS = { primary: '#fff', white: '#990000' };

export default function PaymentConfirmed() {
	const route = useRoute();
	// @ts-ignore
	const { name } = route.params;




	const navigation = useNavigation();
	const Text1 = name
	const Text2 = "Verification created Succesfully!"




	const handlePaymentConfirmed = () => {
		{/* @ts-ignore */ }
		navigation.navigate('Home')
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
	}


	const [isLoading, setLoading] = React.useState(false);





	return (
		<View style={styles.UpdatedContainer}>
			<View style={styles.outerCircle}>
				<View style={styles.InnerCircle1}>
					<View style={styles.InnerCircle2}>
						<View style={styles.InnerCircle3}>
							<View style={styles.InnerCircle4}>
								<Octicons name="check" size={60} color="white" />
							</View>
						</View>
					</View>
				</View>
			</View>
			<Text style={styles.introPassword2}>
				{Text1}
			</Text>
			<Text style={styles.introPassword3}>
				{Text2}</Text>
			<View style={styles.btn_container}>

				<TouchableOpacity style={styles.buttonContainer} onPress={handlePaymentConfirmed}>
					<Text style={styles.buttonText}>Dashboard</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}


const styles = StyleSheet.create({


	buttonContainer: {
		marginTop: 10,
		width: '100%',
		height: windowHeight / 7,
		backgroundColor: '#007AFF',
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
	loading: {
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},

	btn: {
		flex: 1,
		height: 40,
		borderRadius: 5,
		backgroundColor: COLORS.white,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btn_container: {
		marginTop: 100,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: "center",
		margin: 20,
	},

	introPassword2: {
		fontWeight: "bold",
		fontSize: 16,
		fontFamily: "Poppins_600SemiBold",
		margin: 20,
	},

	introPassword3: {
		fontWeight: "bold",
		fontSize: 12,
		fontFamily: "Poppins_300Light",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
		width: Select,
		textAlign: 'center'
	},

	UpdatedContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},

	outerCircle: {
		backgroundColor: 'blue',
		width: 126,
		height: 126,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 40,
	},

	InnerCircle1: {
		backgroundColor: '#EBF9EA',
		width: 150,
		height: 150,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},

	InnerCircle2: {
		backgroundColor: '#90CA94',
		width: 130,
		height: 130,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},

	InnerCircle3: {
		backgroundColor: '#3FA047',
		width: 110,
		height: 110,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},

	InnerCircle4: {
		backgroundColor: '#088414',
		width: 90,
		height: 90,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
	}

})
