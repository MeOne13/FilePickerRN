import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GalleryView} from "./Features/Gallery/GalleryView";
import {JournalRow} from "./Features/Gallery/Types/Rows";
import {GetTestJournal} from "./Features/Gallery/Utils/TestJournalCompositor";
import * as MediaLibrary from "expo-media-library";

export default function App() {
    // MapLibreGL.setAccessToken(null);

    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [rows,setRows] = useState<JournalRow[]>([]);

    const getJournal = async () => {
        console.log('int get');
        // const assets = await MediaLibrary.getAssetsAsync({
        //     // createdAfter: after,
        //     // createdBefore: before,
        //     first: 100,
        //     mediaType: ['photo', 'video']
        // });
        // console.log(assets.assets.length);
        try{
       const journal = await GetTestJournal();
        }
        catch (ex){
            console.log(ex);
        }
       // setRows(journal.rows);
    }
    const clearRows = () => {
        setRows([]);
    }
    return (
        <View style={{height: 500}}>
            <Pressable style={styles.button} onPress={getJournal}>
                <Text style={styles.text}>Picka</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={getJournal}>
                <Text style={styles.text}>Picka</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={()=>getJournal().then((f)=> console.log('Finish in app')).catch((r)=>console.log('In catch app'))}>
                <Text style={styles.text}>Picka</Text>
            </Pressable>
            {/*<MapLibreGL.MapView*/}
            {/*    style={styles.map}*/}
            {/*    logoEnabled={false}*/}
            {/*/>*/}
            <Pressable style={styles.button} onPress={() => clearRows()}>
                <Text style={styles.text}>Clear</Text>
            </Pressable>
            {rows.length > 0 &&
                GalleryView({rows: rows})
            }
        </View>
    );
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    map: {
        flex: 1,
        alignSelf: 'stretch',
    },
});