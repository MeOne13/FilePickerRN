import {Image} from "expo-image";
import {View} from "react-native";
import {OneRow} from "../Types/Rows";
import {ResizeMode, Video} from "expo-av";

interface VideoTileComponentProps {
    source: string,
    height: number,
    width: number
}

export function VideoTileComponent({source, height, width}: VideoTileComponentProps) {
    return (
        <View style={{flexDirection: 'row', height: height, margin: 5, padding: 5}}>
            {source &&
                <Video
                style={{height: height, width: width}}
                source={{uri: source}}
                useNativeControls={true}
                resizeMode={ResizeMode.CONTAIN}
                isLooping={true}
                shouldPlay={false}
                volume={0.5}
            />}
        </View>
    );
}