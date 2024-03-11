import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Layout, Text, TextInput, TopNav, useTheme, themeColor, Button } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from "firebase/auth";
import { FIRESTORE_DB, FIREBASE_AUTH} from '../../firebase/Config';
import { collection, getDocs, doc } from 'firebase/firestore';

export default function ({ navigation }) {
	const { isDarkmode, setTheme } = useTheme();

	// const docRef = doc(FIRESTORE_DB, "car-rental", "03vH6Kc69575t3iaYmMQ");
	// const docSnap = getDoc(docRef);
	const [car, setCar] = React.useState('');
	const fetchPost = async () => {
       
        await getDocs(collection(FIRESTORE_DB, "car-rental"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setCar(newData);                
                console.log(car, newData);
            })
       
    }

	useEffect(() => {
		const carRef = collection(FIRESTORE_DB, 'car-rental');
		fetchPost();
		// const subscriber = onSnapshot(carRef, {
		// 	next: (snapshot) => {
		// 		const cars: any[] = [];
		// 		snapshot.docs.forEach((doc) => {
		// 			cars.push({
		// 				id: doc.id,
		// 				...doc.data()
		// 			});
		// 		});

		// 		setCarName(cars);
		// 	}
		// });
		// console.log(carRef);
		// // // Unsubscribe from events when no longer in use
		// return () => subscriber();
	}, []);
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
			<ScrollView>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text>This is the View Car tab</Text>
				</View>
			</ScrollView>
		</Layout>
	);
}
