import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {AvatarRow} from "../users/AvatarRow";
import {NoteEntry} from "../Types/Items";
import {useFonts} from "expo-font";

// import {Catamaran} from "@expo-google-fonts/inter";

interface NoteTileComponentProps {
    note: NoteEntry,
}

export function NoteTile({note}: NoteTileComponentProps) {
    const [fontsLoaded] = useFonts({
        'Roboto-Black': require('../../../assets/fonts/Roboto-Black.ttf'),
    });
    const [fontsLoaded1] = useFonts({
        'Roboto-Light': require('../../../assets/fonts/Roboto-Light.ttf'),
    });
    const [fontsLoaded2] = useFonts({
        'Catamaran': require('../../../assets/fonts/Catamaran.ttf'),
    });
    // let [fontsLoaded2, fontError] = useFonts({
    //     Catamaran,
    // });
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            paddingLeft: 15,
            paddingTop: 10,
            margin: 5,
            borderRadius: 15,
        }}>
            <AvatarRow user={note.author} textColor='white'/>
            <View style={{flex: 1, flexDirection: 'row', columnGap: 15}}>
                <View style={{height: 150}}>
                    <Text style={{
                        fontSize: 80,
                        color: '#E6E7E8',
                        fontFamily: 'Roboto-Black',
                        margin: 0,
                        padding: 0,
                        paddingVertical: 0
                    }}>“</Text>
                </View>
                <Text
                    numberOfLines={8}
                    style={{
                        fontFamily: 'Roboto-Light',
                        flex: 1,
                        fontSize: 20,
                        color: '#E6E7E8',
                        paddingTop: 10,
                    }}>{note.text}</Text>
            </View>
        </View>
    );
}