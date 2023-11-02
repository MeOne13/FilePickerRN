import {JournalRow} from "./Types/Rows";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {FlashList} from "@shopify/flash-list";
import {RowComponent} from "./RowComponent";
import * as MediaLibrary from "expo-media-library";
import {useState} from "react";
import {GetTestJournal} from "./Utils/TestJournalCompositor";
//
// interface GalleryComponentProps {
//     rows: JournalRow[]
// }

export function GalleryView() {
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [rows, setRows] = useState<JournalRow[]>([]);
    // SystemUI.setBackgroundColorAsync("black");

    const getJournal = async () => {
        console.log('int get');
        // const assets = await MediaLibrary.getAssetsAsync({
        //     // createdAfter: after,
        //     // createdBefore: before,
        //     first: 100,
        //     mediaType: ['photo', 'video']
        // });
        // console.log(assets.assets.length);
        try {
            const journal = await GetTestJournal();
            setRows([...journal.rows]);
        } catch (ex) {
            console.log(ex);
        }
        // setRows(journal.rows);
    }
    const clearRows = () => {
        setRows([]);
        console.log('In clear');
    }
    return (
        <View style={{flex: 1, backgroundColor: 'black', paddingTop: 3}}>
            <FlashList
                ListHeaderComponent={
                    <View style={{flex: 1, paddingTop:50}}>
                        <Pressable style={styles.button}
                                   onPress={() => getJournal().then((f) => console.log('Finish in app')).catch((r) => console.log('In catch app'))}>
                            <Text style={styles.text}>Picka</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={() => clearRows()}>
                            <Text style={styles.text}>Clear</Text>
                        </Pressable>
                    </View>
                }
                disableHorizontalListHeightMeasurement={true}
                drawDistance={500}
                estimatedItemSize={300}
                data={rows}
                renderItem={({item, index}) => RowComponent({row: item})}
            />
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