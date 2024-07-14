import React, { useEffect } from 'react';
import { RefreshControl, TouchableOpacity, FlatList, ScrollView, View, StyleSheet, Image } from 'react-native';
import { Section, SectionContent, SectionImage, Layout, Text, TextInput, TopNav, useTheme, themeColor, Button } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from "firebase/auth";
import { FIRESTORE_DB, FIREBASE_AUTH } from '../../firebase/Config';
import { collection, getDocs, deleteDoc, updateDoc, doc, query, where } from 'firebase/firestore';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		// alignItems: 'center',
		justifyContent: 'center',
	},
	containerBtn: {
		display: 'flex',
		padding: 2,
		flexDirection: 'row',
	},
	containerTxt: {
		display: 'flex',
		padding: 2,
		flexDirection: 'column',
		alignItems: 'left',
	},
	containerPrice: {
		alignItems: 'center',
		padding: 2,
		// marginLeft: '70%'
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
		marginTop: 10,
		margin: 2,
		flex: 1
	},
	txt: {
		// backgroundColor: 'green',
		margin: 2,
		flex: 1
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold',
	},
	price: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	paid: {
		color: 'green'
	},
	unpaid: {
		color: 'red'
	}
});


export default function ({ navigation }) {
	const { isDarkmode, setTheme } = useTheme();
	const [refreshing, setRefreshing] = React.useState(false);
	const [order, setOrder] = React.useState([]);
	// const docRef = doc(FIRESTORE_DB, "car-rental", "03vH6Kc69575t3iaYmMQ");
	// const docSnap = getDoc(docRef);
	const [car, setCar] = React.useState([]);
	// const [data, setData] = React.useState([]);

	const deleteDocument = async (documentId) => {
		try {
			const docRef = doc(FIRESTORE_DB, 'order', documentId);
			await deleteDoc(docRef);
			alert('Cancel Booking Success');
			onRefresh();
		} catch (error) {
			alert('Failed, ', error);
		}
	};

	const confirmPayment = async (documentId) => {
		try {
			const docRef = doc(FIRESTORE_DB, 'order', documentId);
			await updateDoc(docRef, {
				status: 'PAID',
			});
			alert('Confirm PAID');
			onRefresh();
		} catch (error) {
			alert('FAILED, ', error);
			console.log(error)
		}
	};

	const fetchPost = async () => {
		const ref = collection(FIRESTORE_DB, 'order');
		// const q = query(ref, where('user_id', '==', auth.currentUser.uid))
		// const querySnapshot = await getDocs(q)
		await getDocs(ref)
			.then((querySnapshot) => {
				const newData = querySnapshot.docs
					.map((doc) => ({ id: doc.id, ...doc.data() }));
				setOrder(newData);
			});
	};

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetchPost();
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	const renderCarItem = ({ item }) => (
		<View style={styles.card}>
			<Image style={{ width: '100%', aspectRatio: 1.5 }} source={{ uri: item.img }} />
			{/* <Text>{item.id}</Text> */}
			<View style={{ alignItems: 'center', margin: 10 }}>
				<Text style={styles.title}>{item.car_name}</Text>
				<Text>{item.brand}</Text>
			</View>
			<View style={styles.containerTxt}>
				<Text style={styles.txt}>{item.customer_name}</Text>
				<Text style={styles.txt}>{item.customer_nik}</Text>
				<Text style={styles.txt}>{item.driver_option ? 'Need Driver' : 'No Driver'}</Text>
				<Text style={styles.txt}>Order at: {new Date(item.created_at.seconds * 1000).toDateString()}</Text>
				<Text style={styles.txt}>Pickup date: {new Date(item.pickup_date.seconds * 1000).toDateString()}</Text>
				<Text style={styles.txt}>Dropoff date: {new Date(item.dropoff_date.seconds * 1000).toDateString()}</Text>
				<Text style={styles.txt}>Pickup address: {item.pickup_address}</Text>
			</View>
			<View style={styles.containerPrice}>
				<Text style={styles.price}>Rp.{item.price}</Text>
				<Text style={item.status == 'PAID' ? styles.paid : styles.unpaid}>{item.status}</Text>
			</View>

			<View style={styles.containerBtn}>
				<Button
					status="dark100"
					text="Confirm Payment"
					disabled={item.status == 'PAID' ? true : false}
					style={styles.btn}
					onPress={() => confirmPayment(item.id)}
				/>
				<Button
					status="danger"
					text="Cancel Order"
					disabled={item.status == 'PAID' ? true : false}
					style={styles.btn}
					onPress={() => deleteDocument(item.id)}
				/>
			</View>

		</View>
	);

	useEffect(() => {
		fetchPost();
	}, []);

	return (
		<Layout>
			<TopNav
				middleContent={
					<Image
						style={styles.logo}
						source={require('../../../assets/logo.png')}
					/>
				}
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
					data={order}
					renderItem={renderCarItem}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				/>
			</View>

		</Layout>
	);
}
