import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Layout, Text, TextInput, TopNav, useTheme, themeColor } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore } from 'firebase/firestore';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 2
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
                rightContent={
                    <Ionicons
                        name={isDarkmode ? "sunny" : "moon"}
                        size={20}
                        color={isDarkmode ? themeColor.white100 : themeColor.dark}
                    />
                }
                rightAction={() => {
                    if (isDarkmode) {
                        setTheme("light");
                    } else {
                        setTheme("dark");
                    }
                }}
            />
            <View>
                <Text style={{ marginBottom: 10, marginTop: 20 }}>TextInput with leftContent</Text>
                <TextInput
                    placeholder="Enter your password"
                    value={pass}
                    onChangeText={(val) => setPass(val)}
                // leftContent={
                //     <Ionicons name="lock-closed" size={20} color={theme.gray300} />
                // }
                />
            </View>
            <View>
                <Text style={{ marginBottom: 10 }}>TextInput with rightContent</Text>
                <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                // rightContent={
                //     <Ionicons name="mail" size={20} color={theme.gray300} />
                // }
                />
            </View>

            <View style={styles.container}>
                
                {/* <FlatList
                    data={[
                        { key: 'Devin' },
                        { key: 'Dan' },
                        { key: 'Dominic' },
                        { key: 'Jackson' },
                        { key: 'James' },
                        { key: 'Joel' },
                        { key: 'John' },
                        { key: 'Jillian' },
                        { key: 'Jimmy' },
                        { key: 'Julie' }

                    ]}
                    renderItem={({ item }) =>
                        // <Text style={styles.item}>{item.key}</Text>
                        <View
                            style={[
                                styles.box,
                                {
                                    transform: [{ scaleX: 2 }],
                                },
                            ]}>
                            <Text style={styles.item}>{item.key}</Text>
                        </View>
                    }
                /> */}
            </View>
        </Layout>
    );
}