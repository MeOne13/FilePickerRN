import {Image} from "expo-image";
import {Text, View} from "react-native";
import {OneRow} from "../Types/Rows";

interface POITileComponentProps {
    title: string,
    // height: number,
    // width: number
}

export function POITile({title}: POITileComponentProps) {
    return (
        <Text>{title}</Text>
    );
}