import React, { useEffect } from "react";
import { View, StyleSheet, RefreshControl, Image, Modal, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { signOut, getAuth } from "firebase/auth";
import {
  Layout,
  Text,
  TopNav,
  TextInput,
  Button,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { FIRESTORE_DB, FIREBASE_AUTH } from '../firebase/Config';
import { collection, getDocs, getDoc, deleteDoc, doc, query, where, or } from 'firebase/firestore';
import { SafeAreaView } from "react-native-safe-area-context";
import { Lato_400Regular, Lato_400Regular_Italic } from "@expo-google-fonts/lato";
import * as Font from 'expo-font';
import numeral from 'numeral';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f0f0f0',
  },
  header: {
    height: 60,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  card: {
    flex: 0,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'grey'
  },
  cardHorizontal: {
    flex: 0,
    width: 300,
    height: 200,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'grey'
  },
  cardText: {
    fontSize: 18,
  },
  footer: {
    height: 80,
    // backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  footerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 8,
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
  containerBtn: {
    display: 'flex',
    padding: 2,
    flexDirection: 'row',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 120,
    height: 20,
  },
  containerBrand: {
    marginTop:10,
    display: 'flex',
    flexDirection: 'row'
  },
  carName: {
    width: 195,
    marginTop: 5,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'CustomFont',
  },
  brand: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'CustomFont',
  },
  button: {
    color: 'white',
    margin: 2,
  }
});

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [search, setSearch] = React.useState('');
  const [image, setImage] = React.useState(null);
  const [car, setCar] = React.useState([]);
  const [recomended, setRecomended] = React.useState([]);
  const [detail, setDetail] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const auth = getAuth();

  const fetchPost = async () => {
    await getDocs(collection(FIRESTORE_DB, "car-list", ""))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }));
        setCar(newData);
        // console.log(newData);
      });
  };

  const fetchRecomended = async () => {
    // const snap = await getDoc(doc(FIRESTORE_DB, "car-list", "B26rb1ZopvY0YQTox8Bi", ""))
    const ref = collection(FIRESTORE_DB, "car-list");
    const q = query(ref, where("recomended", "==", true))
    const snap = await getDocs(q);
    const item = [];
      snap.forEach((doc) => {
        item.push({ id: doc.id, ...doc.data()});
        console.log(doc.id, " => ", doc.data());
      });
      setRecomended(item);
    };

  const fetchData = async () => {
    // const snap = await getDoc(doc(FIRESTORE_DB, "car-list", "B26rb1ZopvY0YQTox8Bi", ""))
    const ref = collection(FIRESTORE_DB, "car-list");
    const q = query(ref, where("car_name", ">=", search), where("car_name", "<=", search + '\uf8ff'))
    const snap = await getDocs(q);
    const item = [];
    if (search.length > 0){
      snap.forEach((doc) => {
        item.push({ id: doc.id, ...doc.data()});
        console.log(doc.id, " => ", doc.data());
      });
      setCar(item);
    } else {
      fetchPost();
    }
    
    // if (snap.exists()){
    //   console.log("data", snap.data())
    // } else {
    //   console.log("no data")
    // }
  };

  const handleItemPress = (item) => {
    setDetail(item);
    navigation.navigate("Details", item)
    // setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPost();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const formatCurrency = (number) => {
    return numeral(number).format('0,0');
  };

  const renderCarItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={styles.card}>
        <View style={styles.containerBrand}>
          <Ionicons style={{ position: 'relative', marginRight: 4 }} name="people" size={15} color={'white'} />
          <Text style={{ color: 'white', fontSize: 15 }}>{item.seats}</Text>
        </View>
        <Image style={{ width: '100%', height: 200 }} source={{ uri: item.image_url }} />
        {/* <Text>{item.id}</Text> */}
        <View style={styles.containerBrand}>
          <View style={{ alignContent: 'left' }}>
            <Text style={styles.carName}>{item.car_name}</Text>
            <Text style={styles.brand}>{item.brand}</Text>
          </View>
          <View style={{ marginTop: 5 }}>
            <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10, marginTop: 10 }}>
              <Text>Rp.{formatCurrency(item.price)}/hari</Text>
              <Ionicons style= {{marginLeft: 2}} name="chevron-forward-circle" size={18}/>
            </View>
            {/* <Text style={styles.brand}>{item.brand}</Text> */}
          </View>
        </View>

        {/* <View style={styles.containerTxt}>
          <Text style={styles.txt}>Transmisi: {item.transmision} size="sm"</Text>
          <Text style={styles.txt}>Jumlah Bangku: {item.seats}</Text>
        </View>
        <View style={styles.containerPrice}>
          <Text style={styles.price}>Rp.{item.price}/hari</Text>
        </View> */}

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

  const renderCarItemHorizontal = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={styles.cardHorizontal}>
        <Image style={{ width: '100%', height: 200 }} source={{ uri: item.image_url }} />
        {/* <Text>{item.id}</Text> */}
        <View style={styles.containerBrand}>
          <View style={{ alignContent: 'left' }}>
            <Text style={styles.carName}>{item.car_name}</Text>
            <Text style={styles.brand}>{item.brand}</Text>
          </View>
          <View style={{ marginTop: 5 }}>
            <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10, marginTop: 10 }}>
              <Text>Rp.500.000/hari</Text>
            </View>
            {/* <Text style={styles.brand}>{item.brand}</Text> */}
          </View>
        </View>

        {/* <View style={styles.containerTxt}>
          <Text style={styles.txt}>Transmisi: {item.transmision} size="sm"</Text>
          <Text style={styles.txt}>Jumlah Bangku: {item.seats}</Text>
        </View>
        <View style={styles.containerPrice}>
          <Text style={styles.price}>Rp.{item.price}/hari</Text>
        </View> */}

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

  const renderItem = ({ item }) => (
    <View style={styles.box}>
      <Text>{item.text}</Text>
    </View>
  );


  useEffect(() => {
    fetchPost();
    fetchRecomended();
    fetchData();
    setImage(auth.currentUser.photoURL);
    // console.log(car);
    // if (search.length > 0){
    //   const unsubscribe =
    //   collection(FIRESTORE_DB, 'car-list')
    //   .where('car_name', '>=', search)
    //   .where('car_name', '<=', search + '\uf8ff')
    //   .onSnapshot(querySnapshot => {
    //     const items = [];
    //     querySnapshot.forEach(doc => {
    //       items.push({ id: doc, ...doc.data()});
    //     });
    //     setCar(items);
    //   });
    //   return () => unsubscribe();
    // } else {
    //   setCar([]);
    // }
  }, [search]);

  return (
    <Layout>
      <TopNav
        middleContent=""
        leftContent={
          <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}
          />
        }
        rightContent={
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {image && <Image source={{ uri: image }} style={{ width: 45, height: 45, borderRadius: 100 }} />}
          </View>
        }
        // leftAction={() => {
        // 	if (isDarkmode) {
        // 		setTheme("light");
        // 	} else {
        // 		setTheme("dark");
        // 	}
        // }}
        rightAction={() => {
          navigation.navigate("Profile");
        }}
        backgroundColor="transparent"
        borderColor="transparent"
      />
      <FlatList
        style={{ paddingTop: 5 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <View>
            <View style={{ padding: 15 }}>
              <TextInput
                placeholder="Search"
                value={search}
                onChangeText={(val) => setSearch(val)}
                rightContent={
                  <Ionicons name="search-outline" size={25} color={'grey'} />
                }
              />
            </View>
            <Text style={{ marginLeft: 20, fontFamily: 'CustomFont'}}>Recomended :</Text>
            <FlatList data={recomended}
              renderItem={renderCarItemHorizontal}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        }
        // <View style={styles.container}>
        ListFooterComponent={
          <View style={styles.content}>
            <View style={{display: 'flex', flexDirection: 'row', paddingLeft: 15}}>
            <Button style={styles.button} size="sm" text="ALL"/>
            <Button style={styles.button} size="sm" text="SUV"/>
            <Button style={styles.button} size="sm" text="MPV"/>
            </View>
            <SafeAreaView style={{ flex: 0 }}>
              <FlatList
                data={car}
                renderItem={renderCarItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                // scrollEnabled={false}
                
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
            </SafeAreaView>

            {/* <Button
              text="Go to second screen"
              onPress={() => {
                navigation.navigate("Details");
              }}
              style={{
                marginTop: 10,
              }}
            /> */}
            {/* Tambahkan lebih banyak card sesuai kebutuhan */}
            {/* <View style={styles.footer}>
              <TouchableOpacity style={styles.footerButton} size="sm">
                <Text style={styles.footerButtonText}>Ini Footer</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        }
      />
    </Layout >
  );
}
