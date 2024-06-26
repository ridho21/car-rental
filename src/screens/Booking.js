import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import {
    Layout,
    TopNav,
    Text,
    themeColor,
    Button,
    useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FIRESTORE_DB } from '../firebase/Config';
import { collection, getDoc, getDocs, where, doc } from 'firebase/firestore';

const styles = StyleSheet.create({
    logo: {
        width: 120,
        height: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
})


export default function ({ navigation, route }) {
    const { isDarkmode, setTheme } = useTheme();
    const car = route.params;
    const [date, setDate] = React.useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        hideDatePicker();
    };

    console.log(car);

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
            <View style={styles.container}>
                <Text style={styles.text}>Selected Date: {date.toDateString()}</Text>
                <Button title="Show Date Picker" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
            <View
                style={{
                    // flex: 1,
                    alignItems: "center",
                    // justifyContent: "center",
                }}
            >
                <Text>TES</Text>

                {/* This text using ubuntu font */}
                {/* <Image style={{ width: '100%', height: 280 }} source={{ uri: car.image_url }} />
        <Text fontWeight="bold" style={{ fontSize: 25, marginTop: 20 }}>{car.stock > 0 ? "Tersedia" : "Tidak Tersedia"}</Text>
        <View style={{ alignItems: 'center', backgroundColor: 'black', width: '100%', height: '50%', borderTopEndRadius: 20, borderTopStartRadius: 20, marginTop: 60 }}>
          <Text fontWeight="bold" style={{ alignItems: 'center', color: 'white' }}>{car.brand}</Text>
          <Text fontWeight="bold" style={{ alignItems: 'center', color: 'white' }}>{car.description}</Text>
        </View>
        <View style={{alignItems:'center', position: 'absolute', top: 600, backgroundColor: 'grey', width: '100%', height: '20%', borderTopEndRadius: 20, borderTopStartRadius: 20 }}>
          <Text style={{ color: 'white', marginTop: '5%'}}>{car.price}</Text>         
          <Button
            style={{alignItems: 'center', marginTop: '10%'}}
            status="primary"
            text="Booking Now" />
        </View> */}
            </View>
        </Layout>
    );
}
