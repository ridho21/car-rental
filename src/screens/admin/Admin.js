import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native';
import { Layout, Text, TextInput, TopNav, useTheme, themeColor, Button } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from '../../firebase/Config'



const styles = StyleSheet.create({
    containerBtn: {
        display: 'flex',
        padding: 2,
        flexDirection: 'row',
    },
    containerForm: {
        margin: 10,
        flexDirection: 'column',
    },
    btn: {
        margin: 10,
        marginTop: 20,
        flex: 1
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    box: {
        height: 100,
        width: 300,
        borderRadius: 5,
        marginVertical: 40,
        backgroundColor: '#61dafb',
        alignItems: 'center',
        justifyContent: 'center',
    }
});


export default function ({ navigation }) {
    const [pass, setPass] = React.useState('');
    const [email, setEmail] = React.useState('');
    const { isDarkmode, setTheme } = useTheme();
    return (
        <Layout>
            <TopNav
                middleContent="Admin Page"
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
            {/* <View style={styles.containerBtn}>
                <Button
                    status="primary"
                    text="Add Car"
                    onPress={() => {
                        navigation.navigate("SecondScreen");
                    }}
                    style={styles.btn}
                />
                <Button
                    status="primary"
                    text="View Car"
                    onPress={() => {
                        // signOut(FIREBASE_AUTH);
                    }}
                    style={styles.btn}
                />
            </View> */}
            <View style = {styles.containerForm}>
                <Text style={{ marginBottom: 10, marginTop: 10 }}> Car Name :</Text>
                <TextInput
                    placeholder="Enter your password"
                    value={pass}
                    onChangeText={(val) => setPass(val)}
                // leftContent={
                //     <Ionicons name="lock-closed" size={20}/>
                // }
                />
                <Text style={{ marginBottom: 10, marginTop: 20 }}> Transmision:</Text>
                <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                    rightContent={
                        <Ionicons name="mail" size={20} />
                    }
                />
                <Text style={{ marginBottom: 10, marginTop: 20 }}> Transmision:</Text>
                <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                    rightContent={
                        <Ionicons name="mail" size={20} />
                    }
                />
                <Text style={{ marginBottom: 10, marginTop: 20 }}> Transmision:</Text>
                <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                    rightContent={
                        <Ionicons name="mail" size={20} />
                    }
                /><Text style={{ marginBottom: 10, marginTop: 20 }}> Transmision:</Text>
                <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                    rightContent={
                        <Ionicons name="mail" size={20} />
                    }
                /><Text style={{ marginBottom: 10, marginTop: 20 }}> Transmision:</Text>
                <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                    rightContent={
                        <Ionicons name="mail" size={20} />
                    }
                /><Text style={{ marginBottom: 10, marginTop: 20 }}> Transmision:</Text>
                <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                    rightContent={
                        <Ionicons name="mail" size={20} />
                    }
                /><Text style={{ marginBottom: 10, marginTop: 20 }}> Transmision:</Text>
                <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                    rightContent={
                        <Ionicons name="mail" size={20} />
                    }
                /><Text style={{ marginBottom: 10, marginTop: 20 }}> Transmision:</Text>
                <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                    rightContent={
                        <Ionicons name="mail" size={20} />
                    }
                />
                <Button
                    status="success"
                    text="Submit" outline
                    onPress={() => {
                        // signOut(FIREBASE_AUTH);
                    }}
                    style={styles.btn}
                />
            </View>
            </ScrollView>
        </Layout>
    );
}