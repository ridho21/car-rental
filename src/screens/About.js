import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { FIRESTORE_DB } from '../firebase/Config';
import { collection, getDoc, getDocs, where, doc } from 'firebase/firestore';

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 20,
  },
})


export default function ({ navigation, route }) {
  const { isDarkmode, setTheme } = useTheme();
  const car = route.params;

  console.log(car);

  const handleItemPress = (item) => {
    navigation.navigate("Booking")
    // setModalVisible(true);
  };

  useEffect(() => {
  }, []);

  return (
    <Layout>
      <TopNav
        middleContent={
          <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}
          />
        }
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={() => navigation.goBack()}
      // rightContent={
      //   <Ionicons
      //     name={isDarkmode ? "sunny" : "moon"}
      //     size={20}
      //     color={isDarkmode ? themeColor.white100 : themeColor.dark}
      //   />
      // }
      // rightAction={() => {
      //   if (isDarkmode) {
      //     setTheme("light");
      //   } else {
      //     setTheme("dark");
      //   }
      // }}
      />
      <View
        style={{
          // flex: 1,
          alignItems: "center",
          // justifyContent: "center",
        }}
      >
        {/* This text using ubuntu font */}
        <Text>TES</Text>
      </View>
    </Layout>
  );
}
