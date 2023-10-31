import {Image} from "expo-image";
import {View} from "react-native";
import {OneRow} from "../Types/Rows";
import {ResizeMode, Video} from "expo-av";

interface VideoTileComponentProps {
    source: string,
    thumbnailPath: string
    // height: number,
    // width: number
}

export function VideoTile({source, thumbnailPath}: VideoTileComponentProps) {
    return (
        <Video
            style={{flex: 1, borderRadius: 5}}
            source={{uri: source}}
            posterSource={{uri: thumbnailPath}}
            useNativeControls={true}
            resizeMode={ResizeMode.COVER}
            isLooping={true}
            shouldPlay={false}
            volume={1}
        />
    );
}