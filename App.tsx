import {useState} from 'react';
import {StyleSheet, Pressable, View, Text} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {manipulateAsync, SaveFormat} from 'expo-image-manipulator';
import {useCameraPermissions, useMediaLibraryPermissions} from "expo-image-picker";
import {GalleryView} from "./Features/Gallery/GalleryView";
import {OneRow, Row, ThreeRow, TwoRow} from "./Features/Gallery/Types/Rows";
import {MediaItem} from "./Features/Gallery/Types/Items";

export default function App() {
    const [rows, setRows] = useState<Row[]>([])
    const [permissionResponse] = MediaLibrary.usePermissions({request: true, get: true});
    const [ip] = useCameraPermissions({get: true});
    const [im] = useMediaLibraryPermissions({get: true, request: true});
    const findPhotosAsync = async () => {
        const p = await MediaLibrary.getAssetsAsync({first: 50, mediaType: 'photo'});
        const images: string[] = [];
        for (let i = 0; i < p.assets.length; i++) {
            const resized = await manipulateAsync(p.assets[i].uri, [{
                resize: {
                    height: 400,
                    width: 400
                }
            }], {compress: 0.5, format: SaveFormat.JPEG});
            images.push(resized.uri);
        }
        const tmp_rows: Row[] = [...rows];
        for (let i = 0; i < images.length;) {
            let row: Row;
            if (images.length >= i + 3) {
                //ThreeRow
                row = new ThreeRow([new MediaItem(images[i]), new MediaItem(images[i + 1]), new MediaItem(images[i + 2])]);
                tmp_rows.push(row);
                i += 3;
            }
            if (images.length >= i + 2) {
                //TwoRow
                row = new TwoRow([new MediaItem(images[i]), new MediaItem(images[i + 1])]);
                tmp_rows.push(row);
                i += 2;
            }
            if (images.length >= i + 1) {
                //OneRow
                row = new OneRow([new MediaItem(images[i])]);
                tmp_rows.push(row);
                i++;
            }
        }
        console.log(tmp_rows.length);
        setRows(tmp_rows);
    }
    const clearRows = () => {
        setRows([]);
    }
    return (
        <View style={{height: 500}}>
            <Pressable style={styles.button} onPress={async () => await findPhotosAsync()}>
                <Text style={styles.text}>Picka</Text>
            </Pressable>
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
});