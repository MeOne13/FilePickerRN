// import {useEffect, useState} from 'react';
// import {StyleSheet, View, Text} from 'react-native';
// import {GalleryView} from "./Features/Gallery/GalleryView";
// import * as Location from 'expo-location';
// import {LocationObject} from "expo-location";
// import * as TaskManager from 'expo-task-manager';
//
// const LOCATION_TASK_NAME = 'background-location-task';
//
// export default function App() {
//
//     const [location, setLocation] = useState<LocationObject>();
//     const [errorMsg, setErrorMsg] = useState('');
//     useEffect(() => {
//         (async () => {
//
//             let {status} = await Location.requestForegroundPermissionsAsync();
//             const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
//
//             if (status !== 'granted') {
//                 setErrorMsg('Permission to access location was denied');
//                 return;
//             }
//             await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//                 accuracy: Location.Accuracy.Balanced,
//                 timeInterval: 30000,
//                 distanceInterval: 150
//             });
//
//             let location = await Location.getCurrentPositionAsync({});
//             setLocation(location);
//         })();
//     }, []);
//
//     let text = 'Waiting..';
//     if (errorMsg) {
//         text = errorMsg;
//     } else if (location) {
//         text = JSON.stringify(location);
//     }
//     return (
//         <View style={{flex: 1}}>
//             {GalleryView()}
//             <Text>{text}</Text>
//         </View>
//     );
// }
//
// TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
//     if (error) {
//         console.log(error);
//         // Error occurred - check `error.message` for more details.
//         return;
//     }
//     if (data) {
//         console.log(data);
//         const { locations } = data;
//         let lat = locations[0].coords.latitude;
//         let long = locations[0].coords.longitude;
//
//         console.log(
//             `${new Date(Date.now()).toLocaleString()}: ${lat},${long}`
//         );
//         // do something with the locations captured in the background
//     }
// });
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         gap: 6,
//         paddingTop: 50,
//         alignItems: 'stretch',
//         backgroundColor: "#232323"
//     },
//     button: {
//         alignItems: 'center',
//         paddingTop: 10,
//         paddingLeft: 10,
//         paddingBottom: 10,
//         paddingVertical: 20,
//         paddingHorizontal: 32,
//         borderRadius: 4,
//         elevation: 3,
//         backgroundColor: 'grey',
//     },
//     text: {
//         fontSize: 16,
//         lineHeight: 21,
//         fontWeight: 'bold',
//         letterSpacing: 0.25,
//         color: 'white',
//     }
// });


import React, {useEffect, useState} from "react"
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import MapLibreGL from "@maplibre/maplibre-react-native";
import PropTypes from "prop-types";
import {Camera, CameraType} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {useCameraPermissions} from 'expo-image-picker';
import {StorageAccessFramework} from "expo-file-system";
import {FlashList} from "@shopify/flash-list";
import {LocationObjectCoords} from "expo-location";

const LOCATION_TASK_NAME = "BACKGROUND_LOCATION_TASK"
const TRACK_DIRECTORY = FileSystem.documentDirectory + 'track/'
const TRACK_FILE = FileSystem.documentDirectory + 'track/track.json'
let foregroundSubscription = null
const AnnotationContent = ({title}) => {
    return (
        // <View style={styles.touchableContainer}>
        <View>
            <TouchableOpacity style={styles.touchable}>
                <Text style={styles.touchableText}>Btn</Text>
            </TouchableOpacity>
        </View>
    );
};
AnnotationContent.propTypes = {
    title: PropTypes.string,
};

// Define the background task for location tracking
TaskManager.defineTask(LOCATION_TASK_NAME, async ({data, error}) => {
    if (error) {
        console.error(error)
        return
    }
    if (data) {
        // Extract location coordinates from data
        const {locations} = data
        const location = locations[0]
        if (location) {
            const loc = JSON.stringify(location.coords);
            console.log("Location in background", loc)
            await writeLog(Date.now(), loc);
        }
    }
})

async function writeLog(timeStamp: number, location: string) {
    const content = await FileSystem.readAsStringAsync(TRACK_FILE);
    const appended = content + (content.length === 0 ? '' : '\n') + location;
    await FileSystem.writeAsStringAsync(TRACK_FILE, appended);
    console.log('Writed to file');
}

export default function App() {
    // Define position state: {latitude: number, longitude: number}
    const [points, setPoints] = useState<[number[]]>();
    const [position, setPosition] = useState(null)
    const [logs, setLogs] = useState<string[]>([]);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions({writeOnly: true})
    const [permission1, requestPermission1] = Camera.useCameraPermissions();
    const imagePermission = ImagePicker.getMediaLibraryPermissionsAsync();
    const [status, requestPermissions] = useCameraPermissions();

    MapLibreGL.setAccessToken(null);

    useEffect(() => {
        const fff = async () => {
            const trackInfo = await FileSystem.getInfoAsync(TRACK_FILE);
            if (!trackInfo.exists) {
                await FileSystem.makeDirectoryAsync(TRACK_DIRECTORY);
                await FileSystem.writeAsStringAsync(TRACK_FILE, '');
            }
            const log = await FileSystem.readAsStringAsync(TRACK_FILE);
            const lines = log.split('\n', 1000);
            setLogs(lines);

            const deserPoints: [number[]] = [];
            for (const line of lines) {
                const coord: LocationObjectCoords = JSON.parse(line);
                deserPoints.push([coord.longitude,coord.latitude]);
            }
            console.log(deserPoints);
            setPoints([...deserPoints]);
        }
        fff();

        let timerID = setInterval(async () => {
            const log = await FileSystem.readAsStringAsync(TRACK_FILE);
            const lines = log.split('\n', 1000);
            setLogs([...lines]);
        }, 30000)
        return () => {
            clearInterval(timerID)
        }
    }, [])

    // Start location tracking in foreground
    const startForegroundUpdate = async () => {
        // Check if foreground permission is granted
        const {granted} = await Location.getForegroundPermissionsAsync()
        if (!granted) {
            console.log("location tracking denied")
            return
        }

        // Make sure that foreground location tracking is not running
        foregroundSubscription?.remove()

        // Start watching position in real-time
        foregroundSubscription = await Location.watchPositionAsync(
            {
                // For better logs, we set the accuracy to the most sensitive option
                accuracy: Location.Accuracy.Balanced,
            },
            location => {
                setPosition(location.coords)
            }
        )
    }

    // Stop location tracking in foreground
    const stopForegroundUpdate = () => {
        foregroundSubscription?.remove()
        setPosition(null)
    }

    // Start location tracking in background
    const startBackgroundUpdate = async () => {
        // Don't track position if permission is not granted
        const {granted} = await Location.getBackgroundPermissionsAsync()
        if (!granted) {
            console.log("location tracking denied")
            return
        }

        // Make sure the task is defined otherwise do not start tracking
        const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME)
        if (!isTaskDefined) {
            console.log("Task is not defined")
            return
        }

        // Don't track if it is already running in background
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(
            LOCATION_TASK_NAME
        )
        if (hasStarted) {
            console.log("Already started")
            return
        }

        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            // For better logs, we set the accuracy to the most sensitive option
            accuracy: Location.Accuracy.Balanced,
            showsBackgroundLocationIndicator: true,
            // Make sure to enable this notification if you want to consistently track in the background
            foregroundService: {
                notificationTitle: "Location1",
                notificationBody: "Location tracking in background",
                notificationColor: "#fff",
            },
        })
    }

    // Stop location tracking in background
    const stopBackgroundUpdate = async () => {
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(
            LOCATION_TASK_NAME
        )
        if (hasStarted) {
            // await TaskManager.unregisterAllTasksAsync();
            await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
            console.log("Location tacking stopped")
        }
    }

    const clearLog = async () => {
        await FileSystem.writeAsStringAsync(TRACK_FILE, '');
        setLogs([]);
    }

    async function saveLog() {
        try {
            // const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            // console.log(TRACK_FILE)
            // await MediaLibrary.getPermissionsAsync();

            const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (permissions.granted) {
                const uri = await StorageAccessFramework.createFileAsync(permissions.directoryUri, 'track', 'application/json')
                console.log(uri);
                if (uri) {
                    const content = await FileSystem.readAsStringAsync(TRACK_FILE);
                    console.log(content);
                    await FileSystem.writeAsStringAsync(uri, content);
                }
            }
            // const asset = await MediaLibrary.createAssetAsync(uri);
            // console.log(asset);
            // const album = await MediaLibrary.getAlbumAsync('Documents');
            // console.log(album)
            // const asset = await MediaLibrary.createAssetAsync(TRACK_FILE);
            // console.log('After create')
            // if (album == null) {
            //     await MediaLibrary.createAlbumAsync('Documents1', asset, false);
            // } else {
            //     await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            // }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Longitude: {position?.longitude}</Text>
            <Text>Latitude: {position?.latitude}</Text>
            <View style={styles.separator}/>
            <Button
                onPress={startForegroundUpdate}
                title="Start in foreground"
                color="green"
            />
            <View style={styles.separator}/>
            <Button
                onPress={stopForegroundUpdate}
                title="Stop in foreground"
                color="red"
            />
            <View style={styles.separator}/>
            <Button
                onPress={startBackgroundUpdate}
                title="Start in background"
                color="green"
            />
            <View style={styles.separator}/>
            <Button
                onPress={stopBackgroundUpdate}
                title="Stop in background"
                color="red"
            />
            <View style={styles.separator}/>
            <Button
                onPress={clearLog}
                title="Clear LOG"
                color="red"
            />
            <View style={styles.separator}/>
            <Button
                onPress={saveLog}
                title="Save log to docs"
                color="red"
            />
            <Text>{logs.length}</Text>
            <MapLibreGL.MapView
                style={styles.map}
                styleURL={'https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=9be25934f5c84687bb23c73c9e90ecfa\n'}
                logoEnabled={false}>

                <MapLibreGL.PointAnnotation coordinate={[25.953835, 53.122418]} id={'dgfdfg'}>
                    {/*<TouchableOpacity style={styles.touchable}>*/}
                    {/*</TouchableOpacity>*/}
                </MapLibreGL.PointAnnotation>
                {points &&
                    points.map((p, index) =>
                        // <MapLibreGL.PointAnnotation id={index.toString()} coordinate={[p[0],p[1]]} key={index.toString()}>
                        //     <TouchableOpacity style={styles.touchable}>
                        //         <Text style={styles.touchableText}>Btn</Text>
                        //     </TouchableOpacity>
                        // </MapLibreGL.PointAnnotation>)
                        <MapLibreGL.PointAnnotation coordinate={[p[0], p[1]]} id={index.toString()} title={'ssssss'} key={index.toString()}>
                        </MapLibreGL.PointAnnotation>)
                }

                {/*<MapLibreGL.PointAnnotation*/}
                {/*    coordinate={[52.094461, 23.755750]}*/}
                {/*    id="pt-ann">*/}
                {/*    <Text>Annotation</Text>*/}
                {/*</MapLibreGL.PointAnnotation>*/}
            </MapLibreGL.MapView>
            {/*<FlashList*/}
            {/*    disableHorizontalListHeightMeasurement={true}*/}
            {/*    estimatedItemSize={50}*/}
            {/*    data={logs}*/}
            {/*    renderItem={({item, index}) => <Text numberOfLines={4}*/}
            {/*                                         style={{fontSize: 14, paddingTop:10, flexWrap: 'wrap'}}>{item}</Text>}*/}
            {/*/>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    touchableContainer: {borderColor: 'black', borderWidth: 1.0, width: 60},
    touchable: {
        backgroundColor: 'blue',
        width: 4,
        height: 4,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableText: {
        color: 'white',
        fontWeight: 'bold',
    },
    map: {
        flex: 1,
        height: 300,
        alignSelf: 'stretch',
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        marginTop: 15,
    },
    separator: {
        marginVertical: 8,
    },
})