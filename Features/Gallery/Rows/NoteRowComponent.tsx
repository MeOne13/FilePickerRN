import {NoteRow} from "../Types/Rows";
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {useAssets} from "expo-asset";
import {Image} from "expo-image";
import {Avatar} from "../users/avatar";

interface NoteRowComponentProps {
    row: NoteRow
}

export function NoteRowComponent({row}: NoteRowComponentProps) {
    return (
        <View style={{
            height: row.rowHeight,
            borderRadius: 5,
            borderWidth: 3,
            borderColor: '#5B78BD'}}>
            <Text numberOfLines={10} style={{
                paddingLeft: 15,
                paddingTop: 10,
                fontSize: 18,
                fontFamily: 'Roboto',
                color: '#E6E7E8'}}>
                    <Avatar/>
                    <Text style={{position:'absolute', top: 5}}>{row.note.text}</Text>
        </Text>
        </View>
    );
}