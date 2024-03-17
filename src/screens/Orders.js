import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Image, TouchableOpacity, Modal } from 'react-native';
import { Layout, Text, Button } from 'react-native-rapi-ui';
import { FIRESTORE_DB } from '../firebase/Config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

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
	item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 8,
		alignItems: 'center',
	},
})

export default function ({ navigation }) {
	const [car, setCar] = React.useState([]);
	const [detail, setDetail] = React.useState([]);
	const [modalVisible, setModalVisible] = React.useState(false);
	const [refreshing, setRefreshing] = React.useState(false);

	const fetchPost = async () => {
		await getDocs(collection(FIRESTORE_DB, "car-list", ""))
			.then((querySnapshot) => {
				const newData = querySnapshot.docs
					.map((doc) => ({ id: doc.id, ...doc.data() }));
				setCar(newData);
				// console.log(newData);
			});
	}

	const handleItemPress = (item) => {
		setDetail(item);
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const getCarDetail = async (id) => {
		await getDocs(collection(FIRESTORE_DB, "car-list", "JqSJTVhEQRoPegWAuSWY"))
			.then((querySnapshot) => {
				const newData = querySnapshot.docs
					.map((doc) => ({ id: doc.id, ...doc.data() }));
				setDetail(newData);
				console.log(newData);
			})
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
		<TouchableOpacity onPress={() => handleItemPress(item)}>
			<View style={styles.card}>
				<Image style={{ width: '100%', height: 200 }} source={{ uri: item.image_url }} />
				{/* <Text>{item.id}</Text> */}
				<View style={{ alignItems: 'center', margin: 10 }}>
					<Text style={styles.title}>{item.car_name}</Text>
					<Text>{item.brand}</Text>
				</View>
				<View style={styles.containerTxt}>
					<Text style={styles.txt}>Transmisi: {item.transmision}</Text>
					<Text style={styles.txt}>Jumlah Bangku: {item.seats}</Text>
				</View>
				<View style={styles.containerPrice}>
					<Text style={styles.price}>Rp.{item.price}/hari</Text>
				</View>

				{/* <View style={styles.containerBtn}>
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
			</View> */}
			</View>
		</TouchableOpacity>

	);
	return (
		<Layout>
			<View style={styles.container}>
				<FlatList
					data={car}
					renderItem={renderCarItem}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				/>
				<Modal
					visible={modalVisible}
					animationType="slide"
					transparent={true}
					onRequestClose={closeModal}
				><View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<Image style={{ width: 300, height: 200 }} source={{ uri: detail.image_url }} />
							<Text>{detail ? detail.car_name : ''}</Text>
							<View style={styles.containerBtn}>
								<Button
									status="success"
									text="Order"
									style={styles.btn}
									onPress={closeModal}
								/>
								<Button
									status="danger"
									text="Close"
									style={styles.btn}
									onPress={closeModal}
								/>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		</Layout>
	);
}
