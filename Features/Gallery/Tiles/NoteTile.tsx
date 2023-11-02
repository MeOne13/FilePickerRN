import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {AvatarRow} from "../users/AvatarRow";
import {AudioEntry, NoteEntry} from "../Types/Items";
import {
    useFonts,
    Roboto_100Thin,
    Roboto_300Light,
} from '@expo-google-fonts/roboto';
import {Image} from "expo-image";
import {useAssets} from "expo-asset";

interface NoteTileComponentProps {
    note: NoteEntry | AudioEntry,
}

export function NoteTile({note}: NoteTileComponentProps) {
    let [fontsLoaded] = useFonts({Roboto_300Light, Roboto_100Thin});
    const u = useAssets(require('../../../assets/images/quotesWhite.svg'));
    const u1 = u[0];
    const u2 = u1 && u1[0].localUri;

    const audioAssets = useAssets(require('../../../assets/images/audioWhite.svg'));
    const audioAsset = audioAssets[0];
    const audioImage = audioAsset && audioAsset[0].localUri;
    return (
        <View style={{flex: 1, flexDirection: 'column', paddingLeft: 8, paddingTop: 8}}>
            <AvatarRow user={note.author} textColor='white'/>
            <View style={{flex: 1, flexDirection: 'row', columnGap: 15, paddingLeft: 27}}>
                <View style={{paddingTop: 15}}>
                    {u2 && <Image
                        cachePolicy='memory-disk'
                        placeholder={null}
                        contentFit='fill'
                        style={{height: 25, width: 25}}
                        source={{uri: u2}}
                    />}
                </View>
                {note instanceof NoteEntry && <Text
                    numberOfLines={3}
                    style={{
                        fontFamily: 'Roboto_300Light',
                        flex: 1,
                        paddingTop: 10,
                        fontSize: 18,
                        color: '#E6E7E8',
                    }}>{note.text}</Text>}
                {note instanceof AudioEntry
                    && audioImage
                    && <View
                        style={{
                            paddingTop:15,
                            justifyContent: 'flex-start',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flex: 1,
                        }}>
                        <Image
                            style={{
                                height: 35,
                                width: 300
                            }}
                            cachePolicy='memory-disk'
                            placeholder={null}
                            contentFit='contain'
                            // source={{uri: assets[0].localUri ?? undefined}}
                            source={{uri: audioImage}}
                        />
                        <Text numberOfLines={1}
                            style={{
                                paddingTop:15,
                                color: 'white',
                                fontFamily: 'Roboto_300Light',
                                fontSize: 12,
                            }}>0.15 / 2.34</Text>
                    </View>}
            </View>
        </View>
    );
}