import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GalleryView} from "./Features/Gallery/GalleryView";
import {JournalRow} from "./Features/Gallery/Types/Rows";
import {GetTestJournal} from "./Features/Gallery/Utils/TestJournalCompositor";
import * as MediaLibrary from "expo-media-library";
import {useFonts} from "expo-font";
// import * as SystemUI from 'expo-system-ui';

export default function App() {
    const [fontsLoaded] = useFonts({
        'Inter-Black': require('./assets/fonts/Roboto-Black.ttf'),
    });
    // MapLibreGL.setAccessToken(null);

    // const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    // const [rows, setRows] = useState<JournalRow[]>([]);
    // SystemUI.setBackgroundColorAsync("black");

    // const getJournal = async () => {
    //     console.log('int get');
    //     // const assets = await MediaLibrary.getAssetsAsync({
    //     //     // createdAfter: after,
    //     //     // createdBefore: before,
    //     //     first: 100,
    //     //     mediaType: ['photo', 'video']
    //     // });
    //     // console.log(assets.assets.length);
    //     try {
    //         const journal = await GetTestJournal();
    //         setRows([...journal.rows]);
    //     } catch (ex) {
    //         console.log(ex);
    //     }
    //     // setRows(journal.rows);
    // }
    // const clearRows = () => {
    //     setRows([]);
    //     console.log('In clear');
    // }
    return (
        <View style={{flex:1}}>
            {/*<Pressable style={styles.button}*/}
            {/*           onPress={() => getJournal().then((f) => console.log('Finish in app')).catch((r) => console.log('In catch app'))}>*/}
            {/*    <Text style={styles.text}>Picka</Text>*/}
            {/*</Pressable>*/}
            {/*<Pressable style={styles.button} onPress={() => clearRows()}>*/}
            {/*    <Text style={styles.text}>Clear</Text>*/}
            {/*</Pressable>*/}
            {/*{rows?.length > 0 &&*/}
            {GalleryView()}
            {/*}*/}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 6,
        paddingTop: 50,
        alignItems: 'stretch',
        backgroundColor: "#232323"
    },
    button: {
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingVertical: 20,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'grey',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
});