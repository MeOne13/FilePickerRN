import {AudioRow, NoteRow} from "../Types/Rows";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {AvatarRow} from "../users/AvatarRow";
import {NoteTile} from "../Tiles/NoteTile";

interface NoteRowComponentProps {
    row: NoteRow | AudioRow
}

export function NoteRowComponent({row}: NoteRowComponentProps) {
    return (
        <NoteTile note={row instanceof NoteRow ? row.note : row.audio}/>
    );
}