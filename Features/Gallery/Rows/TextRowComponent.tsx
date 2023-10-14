import {OneRow, TextRow} from "../Types/Rows";
import {Text, View} from "react-native";
import {Image} from "expo-image";

interface TextRowComponentProps {
    row: TextRow
}

export function TextRowComponent({row}: TextRowComponentProps) {
    return (
        <View style={{flexDirection: 'row', height: row.rowHeight, margin: 5, padding: 5}}>
            <Text 
        </View>
    );
}