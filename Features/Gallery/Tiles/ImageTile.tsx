import {Image} from "expo-image";
import {View} from "react-native";
import {OneRow} from "../Types/Rows";

interface ImageTileComponentProps {
    source: string,
    // height: number,
    // width: number
}

export function ImageTile({source}: ImageTileComponentProps) {
    return (
        <Image
            cachePolicy='memory-disk'
            placeholder={null}
            contentFit='cover'
            style={{flex: 1, borderRadius: 5}}
            source={{uri: source}}
        />
    );
}