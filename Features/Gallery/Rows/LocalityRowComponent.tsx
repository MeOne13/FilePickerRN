import {LocalityRow, NoteRow} from "../Types/Rows";
import {Text, View} from "react-native";
import React from "react";

interface LocalityRowComponentProps {
    row: LocalityRow
}

export function LocalityRowComponent({row}: LocalityRowComponentProps) {
    return (
        <View style={{flexDirection: 'row', height: row.rowHeight}}>
            <Text>wqeqweqew{row.locality.title}</Text>
        </View>
    );
}