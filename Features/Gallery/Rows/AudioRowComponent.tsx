import {AudioRow} from "../Types/Rows";
import {Text, View} from "react-native";
import React from "react";

interface AudioRowComponentProps {
    row: AudioRow
}

export function AudioRowComponent({row}: AudioRowComponentProps) {
    return (
        <View style={{flexDirection: 'row', height: row.rowHeight}}>
            <Text>/\/\/\/\/\/\/\/\/\/\/\/\</Text>
        </View>
    );
}