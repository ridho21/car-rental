import React, { useEffect } from 'react';
import { RefreshControl, TouchableOpacity, FlatList, ScrollView, View, StyleSheet, Image } from 'react-native';
import { Section, SectionContent, SectionImage, Layout, Text, TextInput, TopNav, useTheme, themeColor, Button } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from "firebase/auth";
import { FIRESTORE_DB, FIREBASE_AUTH } from '../../firebase/Config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		// alignItems: 'center',
		justifyContent: 'center',
	},
	card: {
		flex: 0,
		padding: 16,
		marginVertical: 8,
		marginHorizontal: 16,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
	},
	btn: {
		margin: 5
	},
	scrollView: {
		flex: 1,
		backgroundColor: 'pink',
		alignItems: 'center',
		justifyContent: 'center',
	}
});


export default function ({ navigation }) {
	const { isDarkmode, setTheme } = useTheme();
	const [refreshing, setRefreshing] = React.useState(false);
	// const docRef = doc(FIRESTORE_DB, "car-rental", "03vH6Kc69575t3iaYmMQ");
	// const docSnap = getDoc(docRef);
	const [car, setCar] = React.useState([]);
	// const [data, setData] = React.useState([]);

	const deleteDocument = async (documentId) => {
		try {
			const docRef = doc(FIRESTORE_DB, 'car-list', documentId);
			await deleteDoc(docRef);
			alert('Dokumen berhasil dihapus');
		} catch (error) {
			alert('Gagal menghapus dokumen:', error);
		}
	};

	const fetchPost = async () => {
		await getDocs(collection(FIRESTORE_DB, "car-list"))
			.then((querySnapshot) => {
				const newData = querySnapshot.docs
					.map((doc) => ({ id: doc.id, ...doc.data() }));
				setCar(newData);
				// console.log(newData);
			});
	}
	useEffect(() => {
		fetchPost();
		console.log(car);
	}, []);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetchPost();
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	const renderCarItem = ({ item }) => (
		<View style={styles.card}>
			<Image style={{ width: '100%', height: 200 }} source={{ uri: item.image_url }} />
			<Text>{item.id}</Text>
			<Text>{item.car_name}</Text>
			<Text>{item.price}</Text>
			<Text>{item.seats}</Text>
			<Text>{item.transmision}</Text>
			<Button
				status="primary"
				text="Update"
				style={styles.btn}
			/>
			<Button
				status="danger"
				text="Delete"
				style={styles.btn}
				onPress={() => deleteDocument(item.id)}
			/>
		</View>
	);
	return (
		<Layout>
			<TopNav
				middleContent="Car Rental List"
				leftContent={
					<Ionicons
						name={isDarkmode ? "sunny" : "moon"}
						size={20}
						color={isDarkmode ? themeColor.white100 : themeColor.dark}
					/>
				}
				rightContent={
					<Ionicons
						name="log-out-outline"
						size={25}
						color={isDarkmode ? themeColor.white100 : themeColor.dark}
					/>
				}
				leftAction={() => {
					if (isDarkmode) {
						setTheme("light");
					} else {
						setTheme("dark");
					}
				}}
				rightAction={() => {
					signOut(FIREBASE_AUTH);
				}}
			/>


			<View style={styles.container}>
				<FlatList
					data={car}
					renderItem={renderCarItem}
					keyExtractor={(item) => item.id}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				/>
			</View>

		</Layout>
	);
}
