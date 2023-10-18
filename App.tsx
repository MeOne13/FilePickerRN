import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import {manipulateAsync, SaveFormat} from 'expo-image-manipulator';
import {useCameraPermissions, useMediaLibraryPermissions} from "expo-image-picker";
import {GalleryView} from "./Features/Gallery/GalleryView";
import {OneRow, JournalRow, ThreeRow, TwoRow} from "./Features/Gallery/Types/Rows";
import {ImageEntry, MediaKind} from "./Features/Gallery/Types/Items";
import {MasonryFlashList} from "@shopify/flash-list";
// import {CameraRoll} from "@react-native-camera-roll/camera-roll";
// import MapLibreGL from '@maplibre/maplibre-react-native';

export default function App() {
    // MapLibreGL.setAccessToken(null);

    const [rows, setRows] = useState<JournalRow[]>([])
    const [permissionResponse] = MediaLibrary.usePermissions({request: true, get: true});
    const [ip] = useCameraPermissions({get: true});
    const [im] = useMediaLibraryPermissions({get: true, request: true});

    const findPhotosAsync = async () => {
        // const photos = await CameraRoll.getPhotos({
        //     first: 10,
        //     assetType: 'All',
        //     include: ['imageSize', 'location', 'orientation']
        // });
        const p = await MediaLibrary.getAssetsAsync({first: 20, mediaType: 'photo'});
        console.log(p.assets.length)
        const medias: ImageEntry[] = [];
        for (let i = 0; i < p.assets.length; i++) {
            const asset = p.assets[i];
            let mediaItems: ImageEntry;
            if (asset.mediaType === 'video') {
                mediaItems = new ImageEntry(asset.uri, MediaKind.Video);
            } else if (asset.mediaType === 'photo') {
                const resized = await manipulateAsync(p.assets[i].uri, [{
                    resize: {
                        height: 400,
                        width: 400
                    }
                }], {compress: 0.5, format: SaveFormat.JPEG});
                mediaItems = new ImageEntry(resized.uri, MediaKind.Image);
            } else {
                continue;
            }
            medias.push(mediaItems);
        }

        const tmp_rows: JournalRow[] = [...rows];
        for (let i = 0; i < medias.length;) {
            let row: JournalRow;
            if (medias[i].kind === MediaKind.Video || medias.length >= i+1) {
                //OneRow
                row = new OneRow([medias[i]]);
                tmp_rows.push(row);
                i++;
            }
            if (medias.length >= i + 3) {
                //ThreeRow
                row = new ThreeRow([medias[i], medias[i + 1], medias[i + 2]]);
                tmp_rows.push(row);
                i += 3;
            }
            if (medias.length >= i + 2) {
                //TwoRow
                row = new TwoRow([medias[i], medias[i + 1]]);
                tmp_rows.push(row);
                i += 2;
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