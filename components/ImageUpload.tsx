import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { View, Text } from '../components/Themed'
import * as Haptics from 'expo-haptics';
import { baseUrl } from '../shared/baseUrl';
import { useAppSelector } from '../hooks/useStore';
import { Octicons } from '@expo/vector-icons';
import { MaterialIndicator } from 'react-native-indicators';



const ImageUpload = ({ setPhoto, setvisualsimageUrl }: any) => {

	const { user } = useAppSelector((state) => state.auth);
	const [image, setImage] = useState<any>(null);
	const [isLoading, setisLoading] = useState<any>(false);


	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			base64: true,
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.cancelled) {
			setImage(result.uri);
			setisLoading(true)
			let url = `${baseUrl}/authexternal/google/storage/public/fileupload`;
			fetch(url, {
				method: "POST",
				body: JSON.stringify({
					filename: 'image.jpeg',
					data: result?.base64
				}),
				headers: {
					"Content-Type": "application/json",
					// @ts-ignore
					Authorization: `Bearer ${user?.idToken}`,
				}
			}).catch(err => {
				setisLoading(false)
				// console.log('err', err);
			})
				// @ts-ignore
				.then(res => res.json())
				.then(async parsedRes => {
					setisLoading(false)
					console.log('parsedRes', parsedRes);
					if (parsedRes.error) {
						alert(parsedRes.message);
						Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
					} else if (parsedRes.success) {
						setImage(null)
						setvisualsimageUrl(parsedRes?.publicUrl)
					} else {
						setisLoading(false)
					}
				});

		};
	}
	useEffect(() => {
		if (isLoading) {
			setPhoto(true)
		} else {
			setPhoto(false)
		}

	}, [isLoading, setPhoto])



	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<TouchableOpacity onPress={pickImage} style={isLoading ? styles.Choose1 : styles.Choose} disabled={isLoading}  >
				<Text style={styles.Choosetext}>{isLoading ? <MaterialIndicator color='white' size={15} /> : <Octicons name="upload" size={14} />}	{isLoading ? 'Loading please wait!' : 'Choose Photo'}</Text>
			</TouchableOpacity>
			{image && (
				<>
					<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
					<Text>
						{isLoading ? 'Loading please wait!' : ''}
					</Text>
				</>

			)}
		</View>
	);
};
export default ImageUpload;
const styles = StyleSheet.create({
	Choose: {
		backgroundColor: '#007AFF',
		padding: 10,
		borderRadius: 5,
		marginBottom: 10,
	},

	Choosetext: {
		color: "#fff",
		fontWeight: "bold",
		alignItems: 'center'
	},
	Choose1: {
		backgroundColor: 'gray',
		padding: 10,
		borderRadius: 5,
		marginBottom: 10,
	},

	Choosetext1: {
		color: "#fff",
		fontWeight: "bold"
	}
})

