import {NoteRow} from "../Types/Rows";
import {Text, View} from "react-native";
import React from "react";

interface NoteRowComponentProps {
    row: NoteRow
}

export function NoteRowComponent({row}: NoteRowComponentProps) {
    return (
        <View style={{flexDirection: 'row', height: row.rowHeight, margin: 5, padding: 5}}>
            <Text>{row.note.text}</Text>
        </View>
    );
}