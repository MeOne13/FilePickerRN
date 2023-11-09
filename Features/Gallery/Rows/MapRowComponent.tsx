import {MapRow, NoteRow} from "../Types/Rows";
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import MapLibreGL from "@maplibre/maplibre-react-native";

interface MapRowComponentProps {
    row: MapRow
}

export function MapRowComponent({row}: MapRowComponentProps) {
    MapLibreGL.setAccessToken(null);
    return (
        <View style={{flexDirection: 'column', height: row.rowHeight}}>
            <MapLibreGL.MapView
                style={styles.map}
                logoEnabled={false}

            />
            <Text style={{height: 100}}>Items</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    map: {
        flex: 1,
        height:300,
        alignSelf: 'stretch',
    },
});