import {AudioRow} from "../Types/Rows";
import {Text, View} from "react-native";
import React from "react";
import {AudioTile} from "../Tiles/AudioTile";

interface AudioRowComponentProps {
    row: AudioRow
}

export function AudioRowComponent({row}: AudioRowComponentProps) {
    return (
        <View style={{height: row.rowHeight, flex: 1}}>
            <AudioTile audio={row.audio}/>
        </View>
    );
}