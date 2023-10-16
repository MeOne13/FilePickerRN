import {Image} from "expo-image";
import {View} from "react-native";
import {OneRow} from "../Types/Rows";

interface ImageTileComponentProps {
    source: string,
    height: number,
    width: number
}

export function ImageTileComponent({source, height, width}: ImageTileComponentProps) {
    return (
        <View style={{flexDirection: 'row', height: height, margin: 5, padding: 5}}>
            {source && <Image
                cachePolicy='memory-disk'
                placeholder={null}
                contentFit='cover'
                style={{width: width, height: height,}}
                source={{uri: source}}
            />}
        </View>
    );
}