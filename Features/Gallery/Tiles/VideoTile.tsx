import {Image} from "expo-image";
import {View} from "react-native";
import {OneRow} from "../Types/Rows";
import {ResizeMode, Video} from "expo-av";

interface VideoTileComponentProps {
    source: string,
    // height: number,
    // width: number
}

export function VideoTile({source}: VideoTileComponentProps) {
    return (
        <Video
            style={{flex: 1, borderRadius: 15}}
            source={{uri: source}}
            useNativeControls={true}
            resizeMode={ResizeMode.CONTAIN}
            isLooping={true}
            shouldPlay={false}
            volume={0.5}
        />
    );
}