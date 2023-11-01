import {LocalityRow, NoteRow} from "../Types/Rows";
import {Text, View} from "react-native";
import React from "react";
import {LocalityTile} from "../Tiles/LocalityTile";

interface LocalityRowComponentProps {
    row: LocalityRow
}

export function LocalityRowComponent({row}: LocalityRowComponentProps) {
    return (
        <View style={{height: row.rowHeight, flex:1, justifyContent: 'center'}}>
            <LocalityTile locality={row.locality}/>
        </View>
    );
}