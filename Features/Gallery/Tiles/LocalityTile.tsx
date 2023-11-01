import {LocalityRow, NoteRow} from "../Types/Rows";
import {Text, View} from "react-native";
import React from "react";
import {LocalityEntry} from "../Types/Items";

interface LocalityTileComponentProps {
    locality: LocalityEntry
}

export function LocalityTile({locality}: LocalityTileComponentProps) {
    return (
        <View style={{flexDirection: 'row', flex:1, justifyContent: 'flex-end', paddingRight: 20}}>
            <Text style={{fontSize:40, color: 'white'}} >{locality.title}</Text>
        </View>
    );
}