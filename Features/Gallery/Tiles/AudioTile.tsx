import {ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {AvatarRow} from "../users/AvatarRow";
import {AudioEntry, NoteEntry} from "../Types/Items";
import {Image} from "expo-image";
import {useAssets} from "expo-asset";

interface AudioTileComponentProps {
    audio: AudioEntry,
}

export function AudioTile({audio}: AudioTileComponentProps) {
    const u = useAssets(require('../../../assets/images/audio.png'));
    const u1 = u[0];
    const u2 = u1 && u1[0].uri;
    return (
        <View style={{
            backgroundColor: '#FC5100',
            flex: 1,
            flexDirection: 'column',
            paddingLeft: 15,
            paddingTop: 10,
            margin:5,
            borderRadius: 15,
        }}>
            <AvatarRow user={audio.author} textColor='black'/>
            <View style={{flexDirection: 'row', paddingLeft: 15, columnGap: 20, alignItems: 'center', flex: 1}}>
                <Text style={{fontSize: 80, color: 'black'}}>"</Text>
                <Image
                    style={{ height: 50, width: 300, justifyContent: 'center'}}
                    cachePolicy='memory-disk'
                    placeholder={null}
                    contentFit='contain'
                    // source={{uri: assets[0].localUri ?? undefined}}
                    source={{uri: u2}}
                />
            </View>
            <Text style={{textAlignVertical: 'top' ,fontSize: 14, alignSelf:'center', color: 'black', paddingBottom: 5}}>0.15 / 2.34</Text>
        </View>
    );
}