import {NoteRow} from "../Types/Rows";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {AvatarRow} from "../users/AvatarRow";
import {NoteTile} from "../Tiles/NoteTile";

interface NoteRowComponentProps {
    row: NoteRow
}

export function NoteRowComponent({row}: NoteRowComponentProps) {
    return (
        <View style={{height: row.rowHeight, flex:1}}>
            <NoteTile note={row.note}/>
        </View>
    );
}