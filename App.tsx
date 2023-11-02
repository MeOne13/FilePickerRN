import {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {GalleryView} from "./Features/Gallery/GalleryView";
import * as Location from 'expo-location';
import {LocationObject} from "expo-location";
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = 'background-location-task';

export default function App() {

    const [location, setLocation] = useState<LocationObject>();
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        (async () => {

            let {status} = await Location.requestForegroundPermissionsAsync();
            const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                accuracy: Location.Accuracy.Balanced,
                timeInterval: 30000,
                distanceInterval: 150
            });

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    return (
        <View style={{flex: 1}}>
            {GalleryView()}
            <Text>{text}</Text>
        </View>
    );
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
        console.log(error);
        // Error occurred - check `error.message` for more details.
        return;
    }
    if (data) {
        console.log(data);
        const { locations } = data;
        let lat = locations[0].coords.latitude;
        let long = locations[0].coords.longitude;

        console.log(
            `${new Date(Date.now()).toLocaleString()}: ${lat},${long}`
        );
        // do something with the locations captured in the background
    }
});
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