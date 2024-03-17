import React, { useEffect } from "react";
import { View, StyleSheet, RefreshControl, Image, Modal, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { signOut, getAuth } from "firebase/auth";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { FIRESTORE_DB, FIREBASE_AUTH } from '../firebase/Config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { SafeAreaView } from "react-native-safe-area-context";

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
});

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [car, setCar] = React.useState([]);
  const [detail, setDetail] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const auth = getAuth();

  const data = [
    { id: '1', text: 'Elemen 1' },
    { id: '2', text: 'Elemen 2' },
    { id: '3', text: 'Elemen 3' },
    // Tambahkan lebih banyak elemen sesuai kebutuhan
  ];

  const fetchPost = async () => {
    await getDocs(collection(FIRESTORE_DB, "car-list", ""))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }));
        setCar(newData);
        // console.log(newData);
      });
  };

  const handleItemPress = (item) => {
    setDetail(item);
    setModalVisible(true);
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

  const renderCarItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={styles.card}>
        <Image style={{ width: '100%', height: 200 }} source={{ uri: item.image_url }} />
        {/* <Text>{item.id}</Text> */}
        <View style={{ alignItems: 'center', margin: 10 }}>
          <Text style={styles.title}>{item.car_name}</Text>
          <Text>{item.brand}</Text>
        </View>
        {/* <View style={styles.containerTxt}>
          <Text style={styles.txt}>Transmisi: {item.transmision}</Text>
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
    console.log(car);
  }, []);

  return (
    <Layout>
      <FlatList
        style={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <FlatList data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        }
        // <View style={styles.container}>
        ListFooterComponent={
          <View style={styles.content}>
            <SafeAreaView style={{ flex: 0 }}>
              <FlatList
                data={car}
                renderItem={renderCarItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                // scrollEnabled={false}
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
            </SafeAreaView>

            <Button
              text="Go to second screen"
              onPress={() => {
                navigation.navigate("SecondScreen");
              }}
              style={{
                marginTop: 10,
              }}
            />
            {/* Tambahkan lebih banyak card sesuai kebutuhan */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.footerButton}>
                <Text style={styles.footerButtonText}>Ini Footer</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </Layout >
  );
}
